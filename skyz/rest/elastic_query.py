from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json


class ElasticView(APIView):
    electic_backend_ip = 'http://195.175.249.86:9201/'
    electic_api_path = 'turkish/_search'

    body = {
        "query": {
            "more_like_this": {
                "fields": [
                    "content"
                ],
                "like": None,
                "min_term_freq": 1,
                "min_doc_freq": 1
            }
        }
    }

    def post(self, request):
        self.body['query']['more_like_this']['like'] = [self.request.query_params['context']]
        category = self.post_to_elastic(self.body)
        return Response(category)

    def post_to_elastic(self, like):
        headers = {'content-type': 'application/json'}
        f = requests.post(url=self.electic_backend_ip + self.electic_api_path, data=json.dumps(self.body), headers=headers)
        content = json.loads(f.content)
        [x['_source'].pop('content') for x in content['hits']['hits']]
        category = content['hits']['hits']
        return category


