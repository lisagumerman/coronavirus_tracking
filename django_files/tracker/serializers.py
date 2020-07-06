from .models import Location, DateEntry, Detail, LocationType
from rest_framework import serializers
from rest_enumfield import EnumField


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
    type = EnumField(choices=LocationType, to_choice=lambda x: (x, x.name), to_repr=lambda x: x)

    class Meta:
        model = Location
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    date_entries = DateEntrySerializer(many=True, read_only=True)
    type = EnumField(choices=LocationType, to_choice=lambda x: (x, x.name), to_repr=lambda x: x)
    children = SubLocationSerializer(many=True, read_only=True)

    class Meta:
        model = Location
        fields = '__all__'
