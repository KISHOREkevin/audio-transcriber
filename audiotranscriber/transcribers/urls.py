from django.urls import path
from transcribers import views
urlpatterns=[
    path("",views.getAllTranscribers),
    path("create-transcribe/<userid>",views.createTranscriber),
    path("delete-transcribe/<transcribeid>",views.deleteTranscriber),
    path("transcribe/<transcribeid>",views.getTranscriberById),
    path("transcribe/user/<userid>",views.getTranscriberByUser)
]