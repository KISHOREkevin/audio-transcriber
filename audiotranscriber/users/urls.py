from django.urls import path
from users import views
urlpatterns=[
    path("",views.getAllUsers),
    path("user/<userid>/",views.getUserById),
    path("create-user/",views.createUser),
    path("login-user/",views.loginUser),
    path("update-user/<userid>",views.updateUser),
    path("delete-user/<userid>",views.deleteUser)
]