from django.contrib import admin

from .models import DriverPost, MorningTask, NewsArticle

admin.site.register(DriverPost)
admin.site.register(NewsArticle)
admin.site.register(MorningTask)
