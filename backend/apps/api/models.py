import uuid

from django.db import models


class TimeStampedModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class DriverPost(TimeStampedModel):
    author_name = models.CharField(max_length=80)
    vehicle_name = models.CharField(max_length=80)
    message = models.CharField(max_length=280)
    location_label = models.CharField(max_length=120, blank=True)
    radius_km = models.PositiveSmallIntegerField(default=5)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.author_name} - {self.message[:24]}"


class NewsArticle(TimeStampedModel):
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    summary = models.CharField(max_length=280)
    body = models.TextField()
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title


class MorningTask(TimeStampedModel):
    title = models.CharField(max_length=120)
    details = models.CharField(max_length=280, blank=True)
    is_completed = models.BooleanField(default=False)
    priority = models.PositiveSmallIntegerField(default=2)

    class Meta:
        ordering = ["is_completed", "priority", "-created_at"]

    def __str__(self):
        return self.title
