from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry
from datetime import datetime
import csv
from tracker.utils import output, to_num


class Command(BaseCommand):
    help = 'Dump CSV Dates'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)
        parser.add_argument('--type')

    def handle(self, *args, **options):
        path = options['path']
        loc_type = options['type']

        with open(path) as csvfile:
            entry_reader = csv.reader(csvfile, delimiter=',')
            locations = []
            for row in entry_reader:
                first_cell = row[0]
                if 'Date' in first_cell:
                    for cell in row:
                        if 'Date' not in cell:
                            if loc_type == 'N':
                                loc, c = Location.objects.get_or_create(name=cell, type=loc_type)
                            elif loc_type == 'S':
                                usa, c = Location.objects.get_or_create(name="USA", type="N")
                                loc, c = Location.objects.get_or_create(name=cell, type=loc_type, parent=usa)
                            elif loc_type == 'C':
                                usa, c = Location.objects.get_or_create(name="USA", type="N")
                                colo, c = Location.objects.get_or_create(name="Colorado", type="S", parent=usa)
                                loc, c = Location.objects.get_or_create(name=cell, type=loc_type, parent=colo)
                            locations.append(loc)
                elif first_cell is not '' and 'COVID' not in first_cell:
                    for idx, date_value in enumerate(row, start=0):
                        if idx % 2 == 0 and date_value is not '':
                            val_idx = idx+1
                            value = row[val_idx]
                            if 'N/A' not in value:
                                entry = DateEntry(location=locations[int(idx/2)])
                                entry.date = datetime.strptime(date_value, '%m/%d/%y').date()
                                entry.value = to_num(value)
                                entry.save()
                                output(self, f'Data for {entry.location.name} on {entry.date} successfully written.')
            output(self, 'All data successfully written')
