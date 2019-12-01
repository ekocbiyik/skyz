from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json


class ElasticSearch(APIView):
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
        category = self.post_to_elastic(self.request.query_params['context'])
        return Response(category)

    def post_to_elastic(self, like):
        self.body['query']['more_like_this']['like'] = like
        headers = {'content-type': 'application/json'}
        f = requests.post(url=self.electic_backend_ip + self.electic_api_path, data=json.dumps(self.body), headers=headers)
        content = json.loads(f.content)
        [x['_source'].pop('content') for x in content['hits']['hits']]
        category = content['hits']['hits']
        return category


class ElasticInsert(APIView):
    electic_backend_ip = 'http://195.175.249.86:9201/'
    electic_api_path_search = 'turkish/_search'
    electic_api_path_put='turkish/_doc/'

    get_body = {
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "category": None
                        }
                    }
                ],
                "must_not": [],
                "should": []
            }
        },
        "from": 0,
        "size": 10,
        "sort": [],
        "aggs": {}
    }

    put_body = {
        "category": None,
        "content": None
    }

    def post(self, request):
        category = self.request.data['category']
        context_toInsert = self.request.data['context']
        self.body['query']['must']['match']['category'] = category
        headers = {'content-type': 'application/json'}
        f = requests.post(url=self.electic_backend_ip + self.electic_api_path_search, data=json.dumps(self.get_body), headers=headers)
        content = json.loads(f.content)
        temp = content['hits']['hits']['_source']['content']
        id = content['hits']['hits']['_id']
        temp += ' '.join(context_toInsert.translate(str.maketrans('', '', r""":"'""")).lower().split())
        self.put_body['category'] = category
        self.put_body['content'] = temp
        f = requests.post(url=self.electic_backend_ip+self.electic_api_path_put+id, data=json.dumps(temp), headers=headers)
