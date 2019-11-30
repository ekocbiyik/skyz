from .base import BaseModel

__author__ = 'assendis'


class Ekonomi(BaseModel):
    class Meta:
        db_table = "ekonomi"


class Spor(BaseModel):
    class Meta:
        db_table = "spor"


class Politika(BaseModel):
    class Meta:
        db_table = "politika"


class Teknoloji(BaseModel):
    class Meta:
        db_table = "teknoloji"


class Sanat(BaseModel):
    class Meta:
        db_table = "sanat"