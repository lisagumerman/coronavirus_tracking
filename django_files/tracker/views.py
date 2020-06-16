from django.http import Http404
from django.core.serializers import serialize
from rest_framework import viewsets
from .serializers import LocationSerializer, DateEntrySerializer, DetailSerializer
from .models import Location, LocationType
from django.http import JsonResponse
import json


class IndexViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all().prefetch_related('date_entries')
    serializer_class = LocationSerializer


def index(request):
    locs = Location.objects.all().prefetch_related('date_entries')
    response = {
        'locations': make_serial(locs)
    }
    return JsonResponse(data=response)


def locations(request, loc_type):
    # TODO clean location_type
    locs = Location.prefetch().filter(type=loc_type)
    response = {
        'locations': make_serial(locs)
    }
    return JsonResponse(data=response)


def location(request, location_id):
    try:
        loc = Location.prefetch().get(id=location_id)  # TODO details
    except Location.DoesNotExist:
        raise Http404("Location does not exist")

    children = Location.prefetch().get(parent=loc)

    response = {
        'location': make_serial(loc),
        'children': make_serial(children)
    }

    return JsonResponse(data=response)


def make_serial(payload):
    return json.dumps(serialize('json', payload))
