from django.shortcuts import  render, redirect
from django.contrib.auth import login, logout
from django.contrib import messages
from rest_framework.views import APIView
from django.contrib.auth.models import User
import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.db import transaction, IntegrityError
from django.contrib.auth.backends import AllowAllUsersModelBackend
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes

class dlogin(APIView):
    def post(self, request):
        """deals with user auth"""
        print("hello")
        username = request.data['username']
        password = request.data['password']
        auth = AllowAllUsersModelBackend()
    
        user = auth.authenticate(request=request, username=username, password= password)
        if user:
            login(request, user)
        if not user:
            return Response("user not registered", status=status.HTTP_401_UNAUTHORIZED)

        if user.is_active == True:
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response("user needs to wait for approval from a server admin", status=status.HTTP_401_UNAUTHORIZED)
        
def checkCreds(username, password) :
    auth = AllowAllUsersModelBackend()
    user = auth.authenticate(username=username, password= password)
    if user:
        return True
    else:
        return False

