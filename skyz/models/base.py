from django.db import models

__author__ = 'assendis'


class BaseModel(models.Model):
    title = models.CharField(max_length=1000, null=False)
    content = models.CharField(max_length=10000, null=False)
    url = models.CharField(max_length=10000, null=False)
    keywords = models.CharField(max_length=10000)
    date = models.DateTimeField(null=False)
    status = models.CharField(max_length=100, null=False)
    counter = models.IntegerField(null=False)

    class Meta:
        abstract = True


