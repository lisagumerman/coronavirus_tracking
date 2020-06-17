from rest_framework import viewsets
from .serializers import LocationSerializer
from .models import Location


class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all().prefetch_related('date_entries')
    serializer_class = LocationSerializer
