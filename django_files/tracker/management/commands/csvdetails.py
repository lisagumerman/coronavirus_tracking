from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry, Detail
from datetime import datetime
import csv
from tracker.utils import output


class Command(BaseCommand):
    help = 'Dump CSV Details'

    def add_arguments(self, parser):
        parser.add_argument('path', nargs='+', type=str)

    def handle(self, *args, **options):
        path = options['path']
        location = Location.objects.get_or_create(name='Colorado', type='S')
        hosp_idx = None
        death_idx = None
        total_idx = None
        case_idx = None
        new_idx = None

        with open(path) as csvfile:
            entry_reader = csv.reader(csvfile, delimiter=',')
            for row in entry_reader:
                first_cell = row[0]
                if first_cell == '':
                    continue
                elif 'Date' in first_cell:
                    for idx, value in enumerate(row, start=1):
                        if value == 'Hospitalizations':
                            hosp_idx = idx
                        elif value == 'Deaths':
                            death_idx = idx
                        elif value == 'New Tests':
                            new_idx = idx
                        elif value == 'Total Tests':
                            total_idx = idx
                        elif value == 'Cases':
                            case_idx = None
                        continue
                elif first_cell is not '':
                    date = datetime.strptime(first_cell, '%m/%d/%y').date()
                    try:
                        entry = location.date_entries.get(date=date)
                        try:
                            Detail.objects.get(entry=entry)
                            continue  # if we have the detail already, don't worry about it
                        except Detail.DoesNotExist:
                            detail = Detail(entry=entry)
                    except DateEntry.DoesNotExist:
                        entry = DateEntry(location=location, date=date)
                        detail = Detail(dateEntry=entry)

                    for idx, value in enumerate(row, start=1):
                        if idx == hosp_idx:
                            detail.hospitalizations = value
                        elif idx == death_idx:
                            detail.deaths = value
                        elif idx == total_idx:
                            detail.totalTests = value
                        elif idx == new_idx:
                            detail.newTests = value
                        elif idx == case_idx:
                            entry.value = value
                    entry.save()
                    detail.save()
                    output(self, f'Data for {entry.location.name} on {entry.date} successfully written.')
            output(self, 'All data successfully written')
