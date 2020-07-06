from selenium import webdriver
from jsonfinder import jsonfinder
from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry, LocationType
from datetime import date, timedelta, datetime
from tracker.utils import output, driver_path, to_num
import string


class Command(BaseCommand):
    help = 'Scrape State stats'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)

    def fix_date(self, month_day):
        temp_date = f'{month_day} 2020'
        return datetime.strptime(temp_date, "%b %d %Y").date()

    def handle(self, *args, **options):
        driver = webdriver.Chrome(driver_path)

        try:

            temp_name = options['name']
            name = string.capwords(temp_name, '-')

            path = f'https://www.worldometers.info/coronavirus/usa/{temp_name.lower()}/'

            driver.get(path)

            usa, uc = Location.objects.get_or_create(name="USA", type=LocationType.N)

            state, c = Location.objects.get_or_create(name=name, type=LocationType.S, parent=usa)
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
                    entry, c = DateEntry.objects.get_or_create(location=state, date=needed_date)

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
