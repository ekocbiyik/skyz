import base64
import json
from skyz.rest.elastic_query import ElasticSearch
from skyz.rest.bayes_search import BayesSearch

def get_subject(body):
    return 'HOLA'

def get_messages(service):
    results = service.users().messages().list(userId='me', labelIds=['INBOX']).execute()
    messages = results.get('messages', [])
    response = []
    body = ''
    for message in messages[:10]:
        msg = [service.users().messages().get(userId='me', id=message['id']).execute()]
        for m in msg:
            try:
                if 'parts' in m['payload']:
                    try:
                        body = base64.urlsafe_b64decode(m['payload']['parts'][0]['body']['data']).decode('utf-8')
                    except:
                        body = base64.urlsafe_b64decode(m['payload']['parts'][1]['body']['data']).decode('utf-8')
                else:
                    body = base64.b64decode(msg[0]['payload']['body']['data']).decode('utf-8')
            except:
                pass
        body_str = ' '.join(body.translate(str.maketrans('', '', r""":"'""")).lower().split())
        elastic_subject = ElasticSearch().post_to_elastic(body_str)
        bayes_subject = BayesSearch().post_to_bayes(body)
        header = [a for a in msg[0]['payload']['headers'] if a['name'] == 'Subject'][0]['value']
        response.append({'header': header, 'body': body, 'elastic_subject': elastic_subject, 'bayes_subject': bayes_subject})
    return json.loads(json.dumps(response))



