from rest_framework.views import APIView
from quickstart import GoogleApi
from skyz.views.mail_view import get_messages


class Login(APIView):
    def get(self, request):
        service = GoogleApi()
        messages = get_messages(service=service)
        return messages


