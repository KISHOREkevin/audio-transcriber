from rest_framework import serializers
from users import models
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.UserModel
        fields=['id','username','usermail','userpassword']

