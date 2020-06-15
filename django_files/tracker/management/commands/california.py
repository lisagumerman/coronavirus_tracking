from selenium import webdriver
from django.core.management.base import BaseCommand, CommandError
from tracker.models import Location, DateEntry, Detail
from datetime import date, timedelta
from tracker.utils import output, driver_path


class Command(BaseCommand):
    help = 'Scrape California stats'

    def handle(self):
        driver = webdriver.Chrome(driver_path)

        path = 'https://coronavirus.ohio.gov/wps/portal/gov/covid-19/home'

        driver.get(path)

        california, c = Location.objects.prefetch_related('date_entries').get_or_create(name="California", type="S")

        last_entry = california.date_entries.order_by('-date').first()
        if last_entry:
            needed_date = last_entry.date + timedelta(days=1)
        else:
            needed_date = date.today()

        updated_date = driver.find_element_by_xpath('//p[contains(text(),"As of")]').text

        if updated_date.contains(needed_date.strftime("%B %-d, %Y")):
            total_cases = updated_date.split('&nbsp;')[1].replace(',', '')

            entry = DateEntry(location=california, date=needed_date, value=total_cases)
            entry.save()

            output(self, f'Data for {needed_date} successfully written.')
        else:
            output(self, f'No new data to write -- page does not have data for {needed_date}')
