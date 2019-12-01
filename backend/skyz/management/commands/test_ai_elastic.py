from django.core.management.base import BaseCommand
from skyz.models.model import TestDataTablosu
from skyz.rest.elastic_query import ElasticSearch

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        objects = TestDataTablosu.objects.all()
        total_object_count = len(objects)
        succes_rate = 0
        for test in objects:
            tmp = test.__dict__
            response = ElasticSearch().post_to_elastic(' '.join(tmp['content'].translate(str.maketrans('', '', r""":"'""")).lower().split()))[0]['_source']['category']
            if response == tmp['category']:
                succes_rate += 1
        print(str(total_object_count)+"/"+str(succes_rate))



