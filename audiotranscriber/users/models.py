from django.db import models

# Create your models here.

class UserModel(models.Model):
    username=models.CharField(max_length=30)
    usermail=models.CharField(max_length=50)
    userpassword=models.CharField(max_length=150)
