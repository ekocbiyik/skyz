from django.core.management.base import BaseCommand, CommandError
from django.apps.config import AppConfig
from django.apps import apps
import string
import os


class Command(BaseCommand):

    folder_path = '/home/cagri/Workspace/skyz/skyz/formatted_rows/'

    def handle(self, *args, **kwargs):
        model_names = ['ekonomi', 'politika', 'sanat', 'spor', 'teknoloji']
        f = open(self.folder_path + 'all_formatted.txt', 'w+')
        f.write('text,label'+os.linesep)
        for model_name in model_names:
            model = AppConfig.get_model(apps.get_app_config('skyz'), model_name=model_name)
            for m in list(model.objects.all()):
                line = m.__dict__
                f.write(self.format_line(line, model_name))

    def format_line(self, line, model_name):
        return ' '.join(line['content'].translate(str.maketrans('', '', string.punctuation)).lower().split()) + ',' + model_name + os.linesep
