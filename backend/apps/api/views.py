from django.utils import timezone
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DriverPost, MorningTask, NewsArticle
from .serializers import DriverPostSerializer, MorningTaskSerializer, NewsArticleSerializer


class HealthView(APIView):
    def get(self, request):
        return Response(
            {
                "status": "ok",
                "app": "Trustee API",
                "version": "0.1.0",
                "timestamp": timezone.now(),
            }
        )


class DriverPostViewSet(viewsets.ModelViewSet):
    queryset = DriverPost.objects.all()
    serializer_class = DriverPostSerializer


class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer


class MorningTaskViewSet(viewsets.ModelViewSet):
    queryset = MorningTask.objects.all()
    serializer_class = MorningTaskSerializer


class SafetySummaryView(APIView):
    def get(self, request):
        return Response(
            {
                "quiet_street": True,
                "solo_driver": True,
                "stable_route": True,
                "safe_speed": False,
                "smart_audio_unlocked": False,
                "recommendations": [
                    "Reduce speed before enabling Smart Audio.",
                    "Keep the road feed active for nearby safety updates.",
                ],
            }
        )
