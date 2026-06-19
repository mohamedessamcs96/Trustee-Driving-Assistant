from rest_framework import serializers

from .models import DriverPost, MorningTask, NewsArticle


class DriverPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverPost
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


class MorningTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MorningTask
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]
