from selenium import webdriver
from jsonfinder import jsonfinder
from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry, LocationType
from datetime import date, timedelta, datetime
from tracker.utils import output, driver_path, to_num


class Command(BaseCommand):
    help = 'Scrape Country stats'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)

    def fix_date(self, month_day):
        temp_date = f'{month_day} 2020'
        return datetime.strptime(temp_date, "%b %d %Y").date()

    def handle(self, *args, **options):
        driver = webdriver.Chrome(driver_path)

        try:

            temp_name = options['name'].lower()
            if temp_name == 'usa':
                name = 'USA'
            elif temp_name == 'uk':
                name = 'UK'
            else:
                name = options['name'].capitalize()

            path = f'https://www.worldometers.info/coronavirus/country/{temp_name.lower() if name != "USA" else "us"}/'

            driver.get(path)

            country, c = Location.objects.get_or_create(name=name, type=LocationType.N)
            if c:
                output(self, f'Just created {name}')

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

            one_day = timedelta(days=1)
            needed_date = self.fix_date(dates[0])  # might as well go back to the very beginning

            while needed_date <= date.today():
                date_format = needed_date.strftime("%b %d")

                try:
                    idx = dates.index(date_format)
                    entry, c = DateEntry.objects.get_or_create(location=country, date=needed_date)

                    entry.value = cases[idx]
                    entry.save()
                    output(self, f'Data for {needed_date} successfully written.')

                    needed_date += one_day
                except ValueError:
                    output(self, f'No new data to write -- page does not have data for {needed_date}')
                    break
        finally:
            driver.close()

# TODO decide how to calculate cases/million
