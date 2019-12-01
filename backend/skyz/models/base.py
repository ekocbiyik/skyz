from django.db import models

__author__ = 'assendis'


class BaseModel(models.Model):

    title = models.CharField(max_length=1000, null=True)
    content = models.CharField(max_length=10000, null=True)
    url = models.CharField(max_length=10000, null=True)
    keywords = models.CharField(max_length=10000, null=True)
    date = models.DateTimeField(null=True)
    status = models.CharField(max_length=100, null=True)
    counter = models.IntegerField(null=True)

    class Meta:
        abstract = True


