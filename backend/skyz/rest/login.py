from rest_framework.views import APIView
from quickstart import GoogleApi
from skyz.views.mail_view import get_messages
from rest_framework.response import Response


class Login(APIView):
    def post(self, request):
        service = GoogleApi()
        messages = get_messages(service=service)
        return Response(messages)


