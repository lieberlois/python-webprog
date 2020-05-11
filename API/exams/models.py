from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import datetime


# Models for exams-app.

class Exam(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(default=datetime.date.today)
    grade = models.FloatField(
        default=5.0,
        validators=[
            MaxValueValidator(5.0),
            MinValueValidator(1.0)
        ]
    )
