from .models import Location, DateEntry, Detail
from rest_framework import serializers


class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = '__all__'


class DateEntrySerializer(serializers.ModelSerializer):
    detail = DetailSerializer(many=False, read_only=True)

    class Meta:
        model = DateEntry
        fields = '__all__'


class SubLocationSerializer(serializers.ModelSerializer):
    date_entries = DateEntrySerializer(many=True, read_only=True)

    class Meta:
        model = Location
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    date_entries = DateEntrySerializer(many=True, read_only=True)
    children = SubLocationSerializer(many=True, read_only=True)

    class Meta:
        model = Location
        fields = '__all__'
