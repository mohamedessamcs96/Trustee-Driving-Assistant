from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import DriverPostViewSet, HealthView, MorningTaskViewSet, NewsArticleViewSet, SafetySummaryView

router = DefaultRouter()
router.register(r"feed/posts", DriverPostViewSet, basename="driver-post")
router.register(r"news/articles", NewsArticleViewSet, basename="news-article")
router.register(r"morning/tasks", MorningTaskViewSet, basename="morning-task")

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("safety/summary/", SafetySummaryView.as_view(), name="safety-summary"),
    path("v1/", include(router.urls)),
]
