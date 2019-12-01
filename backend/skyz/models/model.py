from .base import BaseModel
from django.db import models

__author__ = 'assendis'


class Ekonomi(BaseModel):
    class Meta:
        db_table = "ekonomi"
        app_label = 'skyz'


class Spor(BaseModel):
    class Meta:
        db_table = "spor"
        app_label = 'skyz'



class Politika(BaseModel):
    class Meta:
        db_table = "politika"
        app_label = 'skyz'



class Teknoloji(BaseModel):
    class Meta:
        db_table = "teknoloji"
        app_label = 'skyz'



class Sanat(BaseModel):
    class Meta:
        db_table = "sanat"
        app_label = 'skyz'


#TODO bu tablo dolup hesaplama yapılacak.
class TestDataTablosu(models.Model):
    content = models.CharField(max_length=10000, null=True)
    category = models.CharField(max_length=20, null=True)

    class Meta:
        db_table = "test_data"
        app_label = 'skyz'
