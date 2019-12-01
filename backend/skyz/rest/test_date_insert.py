from rest_framework.views import APIView
from skyz.models.model import TestDataTablosu
from rest_framework.response import Response


class TestData(APIView):

    def post(self, requests):
        content = self.request.data['content']
        category = self.request.data['category']
        TestDataTablosu.objects.create(content=content, category=category)
        return Response('Succes')