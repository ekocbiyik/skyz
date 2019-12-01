import base64
import json
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from skyz.rest.elastic_query import ElasticSearch

def get_subject(body):
    return 'HOLA'

def get_messages(service):
    results = service.users().messages().list(userId='me', labelIds=['INBOX']).execute()
    messages = results.get('messages', [])
    response = []
    for message in messages:
        msg = [service.users().messages().get(userId='me', id=message['id']).execute()]
        for m in msg:
            try:
                if 'parts' in m['payload']:
                    try:
                        body = base64.b64decode(m['payload']['parts'][0]['body']['data']).decode('utf-8')
                    except:
                        body = base64.b64decode(m['payload']['parts'][1]['body']['data']).decode('utf-8')
                else:
                    body = base64.b64decode(msg[0]['payload']['body']['data']).decode('utf-8')
            except:
                pass
        body_str = ' '.join(body.translate(str.maketrans('', '', r""":"'""")).lower().split())
        subject = ElasticSearch().post_to_elastic(body_str)
        header = [a for a in msg[0]['payload']['headers'] if a['name'] == 'Subject'][0]['value']
        response.append({'header': header, 'body': body, 'subject': subject})

    return Response(status=HTTP_200_OK, data=json.loads(json.dumps(response)))


