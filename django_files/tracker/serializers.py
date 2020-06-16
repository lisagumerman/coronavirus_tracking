from .models import Location, DateEntry, Detail
from rest_framework import serializers


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'type', 'parent', 'date_entries']


class DateEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DateEntry
        fields = ['id', 'date', 'value', 'detail']


class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = ['deaths', 'hospitalizations', 'totalTests', 'newTests']
