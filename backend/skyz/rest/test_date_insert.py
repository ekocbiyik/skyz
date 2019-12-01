from rest_framework.views import APIView
from skyz.models.model import TestDataTablosu


class TestData(APIView):

    def post(self):
        content = self.request.data['content']
        category = self.request.data['category']
        TestDataTablosu.objects.create(content=content, category=category)