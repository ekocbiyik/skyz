from .base import BaseModel

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
