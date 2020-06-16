from django.urls import reverse
from django.db import models
from datetime import date
from enum import Enum


class LocationType(Enum):
    N = "NATION"
    S = "STATE"
    C = "COUNTY"


class Location(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(
        max_length=6,
        choices=[(tag, tag.value) for tag in LocationType],  # Choices is a list of Tuple
        default=LocationType.N
    )
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['type', 'name']
        unique_together = ['type', 'name']

    def __str__(self):
        return f'{LocationType(self.type)}: {self.name}'

    def get_absolute_url(self):
        return reverse('location', args=[str(self.id)])

    @staticmethod
    def prefetch():
        return Location.objects.prefetch_related('date_entries').prefetch_related('date_entries__detail')


class DateEntry(models.Model):
    location = models.ForeignKey('Location', on_delete=models.CASCADE, related_name="date_entries")
    date = models.DateField()
    value = models.IntegerField(default=0)

    class Meta:
        ordering = ['date']
        verbose_name_plural = 'date_entries'
        unique_together = ['date', 'location']

    def __str__(self):
        return f'{self.location.name} on {self.date}: {self.value}'

    def is_for_today(self):
        return self.date == date.today()


class Detail(models.Model):
    dateEntry = models.OneToOneField('DateEntry', on_delete=models.CASCADE)
    deaths = models.IntegerField(default=0)
    hospitalizations = models.IntegerField(default=0)
    totalTests = models.IntegerField(default=0)
    newTests = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.dateEntry.location.name} on {self.dateEntry.date}: {self.deaths}'
