from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'index', views.IndexViewSet)

app_name = 'tracker'
urlpatterns = [
    path('/', include(router.urls))
]

