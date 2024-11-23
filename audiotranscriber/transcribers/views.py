from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from transcribers.models import TranscribeModel
from transcribers.serialize import TranscribeSerializer
from transcribers.services import transcribeGenerator
from users.models import UserModel
from dotenv import load_dotenv
import cloudinary.uploader
import os
load_dotenv()
# Create your views here.
cloudinary.config( 
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
    api_key = os.getenv('CLOUDINARY_API_KEY'), 
    api_secret = os.getenv('CLOUDINARY_SECRET_KEY'), # Click 'View API Keys' above to copy your API secret
    secure=True
)
@api_view(['GET'])
def getAllTranscribers(req):
    try:
        transcribers = TranscribeModel.objects.all()
        if len(transcribers) == 0:
            return Response({"message":"Transcribes not found"},status=404)
        serialize =  TranscribeSerializer(transcribers,many=True)
        return Response(serialize.data,status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"})

@api_view(['GET'])
def getTranscriberById(req,transcribeid):
    try:
        transcriber = TranscribeModel.objects.filter(pk=transcribeid)
        if not transcriber.exists():
            return Response({"message":"No transcribe found"},status=404)
        transcribe = TranscribeModel.objects.get(pk=transcribeid)
        serialize = TranscribeSerializer(transcribe)
        return Response(serialize.data,status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)

@api_view(['GET'])
def getTranscriberByUser(req,userid):
    try:
        transcribers = TranscribeModel.objects.filter(userid=userid)
        if not transcribers.exists():
            return Response({"message":"No Transcribers found"},status=404)
        serialize = TranscribeSerializer(transcribers,many=True)
        return Response(serialize.data,status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)

@api_view(['POST'])
def createTranscriber(req,userid):
    try:
        user = UserModel.objects.filter(pk=userid)
        if not user.exists():
            return Response({"message":"User with this id not found"},status=404)
        source_file= req.FILES.get("audiofile")
        file_upload_cloud = cloudinary.uploader.upload(source_file,folder="transcribes/audio",resource_type="auto")
        content = transcribeGenerator(file_upload_cloud['secure_url'])
        newTranscriber = TranscribeSerializer(data={"audiofile":file_upload_cloud['secure_url'],"content":content,"userid":userid,"audioid": file_upload_cloud['public_id']})
        if newTranscriber.is_valid():
            newTranscriber.save()
        return Response({"message":"New Transcribe saved","transcriber":newTranscriber.data},status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)

@api_view(['DELETE'])
def deleteTranscriber(req,transcribeid):
    try:
        transcriber = TranscribeModel.objects.filter(pk=transcribeid)
        if not transcriber.exists():
            return Response({"message":"No audio file found with this id"},status=404)
        transcribe = TranscribeModel.objects.get(pk=transcribeid)
        cloudinary.uploader.destroy(transcribe.audioid,resource_type="video")
        transcribe.delete()
        return Response({"message":"Transcribe deleted successfully"},status=200)
    except Exception as e:
        print(e)
        return Response({"error":"Server error"},status=500)


        
