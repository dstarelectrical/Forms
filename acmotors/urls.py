from django.urls import path
from . import views
from .views import *


app_name = 'acmotors'
urlpatterns = [
  path('add/', views.addAcMotors, name = "add"),
  path('search/', views.searchAcMotors, name = "search"),
  path('newjob/', views.addNewJob, name = "new job"),
  path('job/<str:pk>/', views.findJob, name='find job'),
  path('motor/<str:pk>/', views.getMotorById, name="get motorby id"),
  path('accondition/<str:pk>/', views.addConditionAssesment, name='Condition Assessment'),
  path('acdismantle/<str:pk>/', views.addDismantleInspection, name='Dismantle Inspection'),
  path('accomments/<str:pk>/', views.comments, name='Comments')
]