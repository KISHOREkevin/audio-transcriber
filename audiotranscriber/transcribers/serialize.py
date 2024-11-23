from rest_framework import serializers
from transcribers import models
class TranscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TranscribeModel
        fields=['id','audiofile','content','userid','audioid']