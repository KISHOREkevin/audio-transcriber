from django.db import models
from users.models import UserModel
# Create your models here.

class TranscribeModel(models.Model):
    audiofile=models.TextField()
    content=models.TextField()
    audioid=models.TextField()
    userid=models.ForeignKey(UserModel,on_delete=models.CASCADE)

