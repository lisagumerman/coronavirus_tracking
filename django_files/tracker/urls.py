from django.urls import path

from . import views

app_name = 'tracker'
urlpatterns = [
    path('/', views.index, name='index'),
    path('/<str:location_type>', views.locations, name="locations"),
    path('/<int:location_id>', views.location, name='location')
]

