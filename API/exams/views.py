from django.shortcuts import render
from rest_framework import viewsets
from .models import Exam
from .serializers import ExamSerializer

# Create your views here.
"""
The class viewsets.ModelViewSet contains all common HTTP-Request-Types (GET, POST, etc.).
Only explicit paths have to be defined, CRUD-Routes are pretty much plug-and-play.
"""


class ExamView(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
