from django.contrib import admin
from transcribers import models
# Register your models here.

class TrasncribeAdmin(admin.ModelAdmin):
    list_display=['id','audiofile','content','userid','audioid']

admin.site.register(models.TranscribeModel,TrasncribeAdmin)

