from django.contrib import admin
from .models import Question, Choice

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["question_text"]}),
        ("Date information", {"fields": ["pub_date"]}),
    ]

    # 添加下面一行来显示关联的Choice对象
    # 这会告诉 Django：“Choice 对象要在 Question 后台页面编辑。
    # 默认提供 3 个足够的选项字段。”
    inlines = [ChoiceInline] 
    
    # 在"change list"页面显示更多字段
    list_display = ("question_text", "pub_date", "was_published_recently")
    list_filter = ["pub_date"]
# 注册Question模型和它的管理类（不用注册Choice模型，
# 因为它已经作为内联模型包含在Question中了）
admin.site.register(Question, QuestionAdmin) 