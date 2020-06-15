from django.contrib import admin

from .models import Location, DateEntry, Detail

# Register your models here.

admin.site.register(Location)
admin.site.register(DateEntry)
admin.site.register(Detail)
# TODO alternate admin
