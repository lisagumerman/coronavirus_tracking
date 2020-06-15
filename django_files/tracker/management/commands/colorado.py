from selenium import webdriver
from django.core.management.base import BaseCommand
from tracker.models import Location, DateEntry, Detail
from datetime import date, timedelta
from tracker.utils import output, driver_path


class Command(BaseCommand):
    help = 'Scrape Colorado stats'

    def handle(self):
        driver = webdriver.Chrome(driver_path)

        co_path = 'https://covid19.colorado.gov/covid-19-data'

        driver.get(co_path)

        colorado, c = Location.objects.prefetch_related('date_entries__detail').get_or_create(name="Colorado", type="S")

        last_entry = colorado.date_entries.order_by('-date').first()
        if last_entry:
            needed_date = last_entry.date + timedelta(days=1)
        else:
            needed_date = date.today()

        updated_date = driver.find_element_by_xpath('//p[contains(text(), "Last update")]')

        if updated_date.text.contains(needed_date.strftime("%B %0d, %Y")):
            path_format = "//div[contains(@class,'field') and contains(.//p, '{}')]/h4/*"

            total_cases = driver.find_element_by_xpath(path_format.format('Cases')).text
            hospital_cases = driver.find_element_by_xpath(path_format.format('Hospitalized')).text
            tests = driver.find_element_by_xpath(path_format.format('tested')).text
            deaths = driver.find_element_by_xpath(path_format.format('deaths')).text

            entry = DateEntry(location=colorado, date=needed_date, value=total_cases)
            entry.save()

            detail = Detail(entry=entry, deaths=deaths, hospitalizations=hospital_cases, totalTests=tests)
            detail.newTests = detail.totalTests - last_entry.detail.totalTests
            detail.save()

            county_rows = driver.find_elements_by_xpath("//table/tbody/tr")

            for row in county_rows:
                county = row.find_element_by_xpath("//td[0]").text.trim()
                if county != "County":
                    cases = row.find_element_by_xpath("//td[1]").text.trim()
                    if cases > 50:
                        location, created = Location.objects.get_or_create(name=county, type="C")
                        location.date_entries.create(date=needed_date, value=cases)

            output(self, f'Data for {needed_date} successfully written.')
        else:
            output(self, f'No new data to write -- page does not have data for {needed_date}')
