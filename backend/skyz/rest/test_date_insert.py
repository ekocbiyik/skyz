from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json

class TestDate(APIView):

    def post(self):
        return Response('asdf')