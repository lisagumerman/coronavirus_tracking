from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'locations', views.LocationViewSet, basename="location")

app_name = 'tracker'
urlpatterns = [
    path('/', include(router.urls))
]

