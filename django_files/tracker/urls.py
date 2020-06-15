from django.urls import path

from . import views

app_name = 'tracker'
urlpatterns = [
    path('', views.index, name='index'),
    path('/countries', views.countries, name='countries'),
    path('/usa', views.usa, name='usa'),
    path('/colorado', views.colorado, name='colorado'),
    path('/<int:location_id>', views.location, name='location')
]

