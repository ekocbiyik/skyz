"""skyz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from skyz.rest.login import Login
from skyz.rest.elastic_query import ElasticSearch, ElasticInsert
from skyz.rest.test_date_insert import TestData
from skyz.rest.bayes_search import BayesSearch
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/', Login.as_view()),
    url(r'^api/elasticsearch', ElasticSearch.as_view()),
    url(r'^api/elasticinsert', ElasticInsert.as_view()),
    url(r'^api/testdateinsert', TestData.as_view()),
    url(r'^api/bayessearch', BayesSearch.as_view()),
]




