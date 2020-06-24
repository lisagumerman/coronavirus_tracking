from selenium import webdriver
from jsonfinder import jsonfinder
from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry
from datetime import date, timedelta
from tracker.utils import output, driver_path


class Command(BaseCommand):
    help = 'Scrape Country stats'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)

    def handle(self, *args, **options):
        driver = webdriver.Chrome(driver_path)

        temp_name = options['name'].lower()
        if temp_name == 'usa':
            name = 'USA'
        elif temp_name == 'uk':
            name = 'UK'
        else:
            name = options['name'].capitalize()

        path = f'https://www.worldometers.info/coronavirus/country/{temp_name.lower() if name != "USA" else "us"}/'

        driver.get(path)

        country, c = Location.objects.prefetch_related('date_entries').get_or_create(name=name, type="N")

        full_text = driver.find_element_by_xpath('//script[contains(text(), "Total Cases")]').get_attribute("innerHTML")
        dates = None
        cases = None
        for start, end, obj in jsonfinder(full_text.split(';')[0]):
            if obj is not None:
                try:
                    obj.index('Mar 23')  # arbitrary start date
                except ValueError:
                    cases = obj
                else:
                    dates = obj

        last_entry = country.date_entries.order_by('-date').first()
        one_day = timedelta(days=1)
        if last_entry:
            needed_date = last_entry.date + one_day
        else:
            needed_date = date(dates[0])  # might as well go back to the very beginning

        while needed_date <= date.today():
            date_format = needed_date.strftime("%b %d")

            try:
                idx = dates.index(date_format)
                entry, c = DateEntry.objects.get_or_create(location=country, date=needed_date)
                entry.total_cases = cases[idx]
                entry.save()

                output(self, f'Data for {needed_date} successfully written.')

                needed_date += one_day
            except ValueError:
                output(self, f'No new data to write -- page does not have data for {needed_date}')

# TODO decide how to calculate cases/million
