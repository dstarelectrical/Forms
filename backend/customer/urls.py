from django.urls import path
from . import views
from .views import *


app_name = 'customer'
urlpatterns = [
  path('add/', views.createCustomer, name = "createCustomer"),
  path('search/', views.searchCustomers, name = "getCustomers"),
  path('get/<str:pk>/', views.getCustomer, name="getCustomer")
]