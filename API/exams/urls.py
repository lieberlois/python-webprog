from django.urls import include, path
from . import views
from rest_framework import routers

# Default router follows standards like /exams for all or /exam/1 for the first exam.
# Also, the default router creates a UI for testing purposes at the root url.
router = routers.DefaultRouter()
router.register('exams', views.ExamView)

urlpatterns = [
    path('', include(router.urls)),
]
