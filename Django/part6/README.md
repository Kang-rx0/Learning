## 添加样式表和图像

项目需要图片（静态文件）来配合html渲染网页，对于大项目，有许多应用和图片分散在不同文件夹，查找麻烦 ===== django.contrib.staticfiles 存在的意义：它将各个应用的静态文件（和一些你指明的目录里的文件）统一收集起来，这样一来，在生产环境中，这些文件就会集中在一个便于分发的地方。

### 添加样式表

**在应用文件夹（polls）下面创建 static 目录，然后再创建polls存放静态文件（polls/static/polls/style.css）。**Django 将在该目录下查找静态文件，这种方式和 Diango 在 polls/templates/ 目录下查找 template 的方式类似。

Django 的 STATICFILES_FINDERS 设置包含了一系列的查找器，它们知道去哪里找到 static 文件。AppDirectoriesFinder 是默认查找器中的一个，它会在每个 INSTALLED_APPS 中指定的应用的子文件中寻找名称为 static 的特定文件夹，就像我们在 polls 中刚创建的那个一样。管理后台采用相同的目录结构管理它的静态文件。

**因为 AppDirectoriesFinder 的存在，你可以在 Django 中以 polls/style.css 的形式引用此文件，类似你引用模板路径的方式。**

在polls/static/polls/style.css编辑：

```css
li a {
    color: green;
}
```

在 polls/templates/polls/index.html 的文件头添加：

```html
{% load static %}

<link rel="stylesheet" href="{% static 'polls/style.css' %}">
```

{% static %} 模板标签会生成静态文件的绝对路径。

### 添加图片
在 polls/static/polls/ 目录下创建images文件夹存放图片，图片完整路径：

```
polls/static/polls/images/background.png
```

然后，在样式表中添加对图像的引用（polls/static/polls/style.css）：
```css
body {
    background: white url("images/background.jpg") no-repeat;
}
```