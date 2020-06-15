from django.http import Http404
from django.core.serializers import serialize
from .models import Location
from datetime import timedelta
from django.http import JsonResponse
import json


def index():
    locs = Location.prefetch().all()
    response = {
        'locations': create_array_response(locs)
    }
    return JsonResponse(data=response)


def locations(loc_type):
    locs = Location.prefetch().prefetch_related('date_entries').filter(type=loc_type)
    response = {
        'locations': create_array_response(locs)
    }
    return JsonResponse(data=response)


def location(location_id):
    try:
        loc = Location.objects.prefetch_related('date_entries').get(id=location_id)  # TODO details
    except Location.DoesNotExist:
        raise Http404("Location does not exist")

    children = Location.objects.prefetch_related('date_entries').get(parent=loc)

    response = {
        'location': create_response(loc),
        'children': create_array_response(children)
    }

    return JsonResponse(data=response)


def create_response(loc):
    entries = loc.date_entries.order_by('-date')
    next_date = entries.first() + timedelta(days=1) if entries.count() > 0 else None

    response = {
        'id': loc.id,
        'name': loc.name,
        'date_entries': entries,
        'next_date': next_date
    }

    return make_serial(response)


def create_array_response(query):
    locs = []

    for loc in query:
        entries = loc.date_entries.order_by('-date')
        next_date = entries.first() + timedelta(days=1) if entries.count() > 0 else None

        locs.append({
            'id': loc.id,
            'name': loc.name,
            'date_entries': entries,
            'next_date': next_date
        })

    return make_serial(locs)


def make_serial(payload):
    return json.loads(serialize('json', payload))
