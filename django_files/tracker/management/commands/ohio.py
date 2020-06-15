from selenium import webdriver
from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry
from datetime import date, timedelta
from tracker.utils import output, driver_path


class Command(BaseCommand):
    help = 'Scrape Ohio stats'

    def handle(self):

        driver = webdriver.Chrome(driver_path)

        path = 'https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/ncov2019.aspx'

        driver.get(path)

        ohio, c = Location.objects.prefetch_related('date_entries').get_or_create(name="Ohio", type="S")

        last_entry = ohio.date_entries.order_by('-date').first()
        if last_entry:
            needed_date = last_entry.date + timedelta(days=1)
        else:
            needed_date = date.today()

        updated_date = driver.find_element_by_xpath('//div[@class="stats-cards__update-msg"]/span[1]')

        if updated_date.text.contains(needed_date.strftime("%m/%d/%y")):
            path_format = '//div[@class="stats-cards__label" and contains(text(),"{}")]/ancestor::div[@class="stats-cards__item"]/div[@class="stats-cards__number"]'

            total_cases = driver.find_element_by_xpath(path_format.format('Total Cases')).text.replace(',', '')

            entry = DateEntry(location=ohio, date=needed_date, value=total_cases)
            entry.save()

            output(self, f'Data for {needed_date} successfully written.')
        else:
            output(self, f'No new data to write -- page does not have data for {needed_date}')
