from django.shortcuts import render
from users.serializer import UserSerializer
from users.models import UserModel
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password,check_password
# Create your views here.

@api_view(['GET'])
def getAllUsers(req):
    try:
        users = UserModel.objects.all()
        if len(users)==0:
            return Response({"message":"No users found"},status=404)
        serialize = UserSerializer(users,many=True)
        return Response(serialize.data,status=200)
    except Exception as e:
        print(e)
        return Response({"error":"An error occurred"},status=500)

@api_view(['GET'])
def getUserById(req,userid):
    try:
        existinguser = UserModel.objects.filter(pk=userid)
        if not existinguser.exists():
            return Response({"message":"User not found with this id"},status=404)
        user = UserModel.objects.get(pk=userid)
        serialize = UserSerializer(user)
        return Response(serialize.data,status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)

@api_view(['POST'])
def createUser(req):
    try:
        existinguser = UserModel.objects.filter(usermail=req.data['usermail'])
        if existinguser.exists():
            return Response({"message":"Already user exists"},status=409)
        hashedpassword = make_password(req.data['userpassword'])
        newUser=UserSerializer(data={'username':req.data['username'],'usermail':req.data['usermail'],'userpassword':hashedpassword})
        if newUser.is_valid():
            newUser.save()
        else:
            return Response({"error":"An error occurred"},status=400)
        return Response({"message":"User created"},status=201)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)

@api_view(['POST'])
def loginUser(req):
    try:
        existinguser = UserModel.objects.filter(usermail=req.data['usermail'])
        if not existinguser.exists():
            return Response({"message":"User not found"},status=404)
        user = UserModel.objects.get(usermail=req.data['usermail'])
        valid = check_password(req.data['userpassword'],user.userpassword)
        validUser = UserSerializer(user)
        if valid:
            return Response({"userid":validUser.data['id'],"message":"Login successful"},status=200)
        else:
            return Response({"message":"User not found"},status=404)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)
    
@api_view(['PUT'])
def updateUser(req,userid):
    try:
        existinguser = UserModel.objects.filter(pk=userid)
        if not existinguser.exists():
            return Response({"message":"User not found"},status=404)
       
        existinguser.update(username=req.data['username'],usermail=req.data['usermail'])
        return Response({"message":"User updated"},status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)

@api_view(['DELETE'])
def deleteUser(req,userid):
    try:
        existinguser = UserModel.objects.filter(pk=userid)
        if not existinguser.exists():
            return Response({"message":"User not found"},status=404)
        existinguser.delete()
        return Response({"message":"User deleted"},status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)