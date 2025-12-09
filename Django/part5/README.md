## 关于自动化测试

### 第一个测试脚本

目前的程序有个bug（在part5之前的，part5这里会修复），出现在Question的was_published_recently()方法。即使发布日期 pub_date (12.1) 比当前时间 (11.28)还晚时也会返回 True。也就是缺少了一个限制，发布日期不能在未来。

通过shell可以测试这个bug：
```bash
$ python manage.py shell
>>> import datetime 
>>> from django.utils import timezone
>>> from polls.models import Question
# 用当前时间加上30天来创建一个未来的发布日期 future_question
>>> future_question = Question(pub_date=timezone.now() + datetime.timedelta(days=30))
>>> future_question.was_published_recently()
True
```

接下来编写一个自动化脚本，通常该脚本会创建在 polls/tests.py 文件中。测试系统会自动的在所有文件里寻找并执行**以 test 开头的测试函数**。

    ```python
    import datetime

    from django.test import TestCase
    from django.utils import timezone

    from .models import Question

    class QuestionModelTests(TestCase):
        def test_was_published_recently_with_future_question(self):
            """
            was_published_recently() 应该返回False，当 pub_date 在未来时。
            """
            time = timezone.now() + datetime.timedelta(days=30)
            future_question = Question(pub_date=time)
            self.assertIs(future_question.was_published_recently(), False)
    ```

Django使用Python的unittest模块来运行测试。将创建一个测试类，继承自django.test.TestCase，并编写一个测试方法来验证was_published_recently()的行为。

运行测试：
```bash
$ python manage.py test polls
```

程序的运行过程：
- python manage.py test polls 将会寻找 polls 应用里的测试代码
- 它找到了 django.test.TestCase 的一个子类 QuestionModelTests   
- 它创建一个特殊的数据库供测试使用
- 它在类中寻找测试方法——以 test 开头的方法。
- 在 test_was_published_recently_with_future_question 方法中，它创建了一个 pub_date 值为 30 天后的 Question 实例。
- 接着使用 assertIs() 方法，发现 was_published_recently() 返回了 True，而我们期望它返回 False。

### 修复bug
修改 Question 模型的 was_published_recently() 方法，让它只在pub_date是过去时间才进行检查

    ```python
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
    ```

### 更全面的测试
为了确保 was_published_recently() 方法的正确性，可以添加更多的测试用例，覆盖不同的时间场景：

    ```python
    def test_was_published_recently_with_old_question(self):
        """
        对于pub_date大于1天的问题，was_publishhed_recent（）返回False。
        """
        time = timezone.now() - datetime.timedelta(days=1, seconds=1)
        old_question = Question(pub_date=time)
        self.assertIs(old_question.was_published_recently(), False)


    def test_was_published_recently_with_recent_question(self):
        """
        对于public_date在最近一天内的问题，was_publishhed_recent（）返回True。s
        """
        time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
        recent_question = Question(pub_date=time)
        self.assertIs(recent_question.was_published_recently(), True)
    ```

### 测试视图

Django提供了测试工具client，可以模拟用户与Django应用的交互。可以使用它来测试视图函数是否按预期工作。

- 在shell里配置环境s
    ```bash
    $ python manage.py shell
    >>> from django.test.utils import setup_test_environment
    >>> setup_test_environment()
    ```

    setup_test_environment() 安装了一个模板渲染器，这将使我们能够检查响应上的一些额外属性，如 response.context。这个方法 **不会** 建立一个测试数据库，所以下面的内容**将针对现有的数据库运行**

- 导入客户端
    ```bash
    >>> from django.test import Client
    >>> # create an instance of the client for our use
    >>> client = Client()
    ```

- 使用客户端发起请求
    ```bash
    >>> # 从根目录获得响应 '/'
    >>> response = client.get("/")
    Not Found: /
    >>> # 对于根目录，应该看到一个404; 如果看到"Invalid HTTP_HOST header" error 和 400
    >>> # 这可能是忽略了前面的setup_test_environment() 调用
    >>> response.status_code
    404
    >>> # 而对于 '/polls/'，应该看到一些内容（或者正确的响应码）
    >>> # 使用 'reverse()' 而不是 硬编码 URL
    >>> from django.urls import reverse
    >>> response = client.get(reverse("polls:index"))
    >>> response.status_code
    200
    >>> response.content
    b'\n    <ul>\n    \n        <li><a href="/polls/1/">What&#x27;s up?</a></li>\n    \n    </ul>\n\n'
    >>> response.context["latest_question_list"]
    <QuerySet [<Question: What's up?>]>
    ```

### 改善视图代码

期望会显示所有的问题，对于未来问题，在达到发布日期之前不应该显示。**改进 get_queryset() 方法**，让他它能通过**将 Question 的 pub_data 属性与 timezone.now() 相比较**来判断是否应该显示此 Question

    ```python
    from django.utils import timezone
    def get_queryset(self):
        """
        返回最近发布的5个问题（不包括未来问题）
        """
        # Question.objects.filter(pub_date__lte=timezone.now())会返回pub_date小于等于当前时间的Question对象
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by("-pub_date")[
            :5
        ]
    ```

### 用脚本测试视图

在polls/tests.py中添加以下代码：

    ```python
    from django.urls import reverse

    def create_question(question_text, days):
        """
        使用给定的“question_text”创建一个问题，并发布到现在的给定“days”偏移量（过去发布的问题为负，尚未发布的问题为正）。
        """
        time = timezone.now() + datetime.timedelta(days=days)
        return Question.objects.create(question_text=question_text, pub_date=time)


    class QuestionIndexViewTests(TestCase):
        def test_no_questions(self):
            """
            如果不存在问题，则显示相应的消息。s
            """
            response = self.client.get(reverse("polls:index"))
            self.assertEqual(response.status_code, 200)
            self.assertContains(response, "No polls are available.")
            self.assertQuerySetEqual(response.context["latest_question_list"], [])

        def test_past_question(self):
            """
            对于pub_date是过去时间的问题将显示在索引页上
            """
            question = create_question(question_text="Past question.", days=-30)
            response = self.client.get(reverse("polls:index"))
            self.assertQuerySetEqual(
                response.context["latest_question_list"],
                [question],
            )

        def test_future_question(self):
            """
            对于pub_date是未来时间的问题不会显示在索引页上
            """
            create_question(question_text="Future question.", days=30)
            response = self.client.get(reverse("polls:index"))
            self.assertContains(response, "No polls are available.")
            self.assertQuerySetEqual(response.context["latest_question_list"], [])

        def test_future_question_and_past_question(self):
            """
            即使同时存在未来和过去的问题，只有过去的问题会显示在索引页上。  
            """
            question = create_question(question_text="Past question.", days=-30)
            create_question(question_text="Future question.", days=30)
            response = self.client.get(reverse("polls:index"))
            self.assertQuerySetEqual(
                response.context["latest_question_list"],
                [question],
            )

        def test_two_past_questions(self):
            """
            即使存在多个过去的问题，它们也会按发布时间降序显示在索引页上。
            """
            question1 = create_question(question_text="Past question 1.", days=-30)
            question2 = create_question(question_text="Past question 2.", days=-5)
            response = self.client.get(reverse("polls:index"))
            self.assertQuerySetEqual(
                response.context["latest_question_list"],
                [question2, question1],
            )

还有一个问题：就算在发布日期时未来的那些投票不会在目录页 index 里出现，但是如果用户知道或者猜到正确的 URL ，还是可以访问到它们。所以得在 DetailView 里增加一些约束：

    ```python
    class DetailView(generic.DetailView):
        ...

        def get_queryset(self):
            """
            排除任何尚未发布的问题。
            """
            return Question.objects.filter(pub_date__lte=timezone.now())
    ```

增加一些测试来检验 pub_date 在过去的 Question 能够被显示出来，而 pub_date 在未来的则不可以：
```python 
class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        """
        对于pub_date是未来时间的问题，详细视图返回404 not found.
        """
        future_question = create_question(question_text="Future question.", days=5)
        url = reverse("polls:detail", args=(future_question.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        """
        对于pub_date是过去时间的问题的详细视图显示问题的文本。
        """
        past_question = create_question(question_text="Past Question.", days=-5)
        url = reverse("polls:detail", args=(past_question.id,))
        response = self.client.get(url)
        self.assertContains(response, past_question.question_text)
```