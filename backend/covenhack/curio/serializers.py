from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from .models import UserProfile, StudentData

class DailydataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentData
        fields = '__all__'
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        