from django.contrib import admin
from users import models
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display=['id','username','usermail','userpassword']

admin.site.register(models.UserModel,UserAdmin)