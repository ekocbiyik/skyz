from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json


class BayesSearch(APIView):
    bayes_backend_ip = 'http://127.0.0.1:6161/'
    bayes_api_path = 'api/classify'

    body = {
        "body": None
    }


    def post(self, request):
        category = self.post_to_bayes(self.request.query_params['context'])
        return Response(category)

    def post_to_bayes(self, content):
        self.body['body'] = content
        headers = {'content-type': 'application/json'}
        f = requests.post(url=self.bayes_backend_ip + self.bayes_api_path, data=json.dumps(self.body), headers=headers)
        content = json.loads(f.content)
        category = content['content']
        return category
