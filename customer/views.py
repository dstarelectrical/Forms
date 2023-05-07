from django.shortcuts import render
from rest_framework.decorators import api_view
import uuid
from .models import *
from .serializer import *
from django.http import JsonResponse,HttpResponse
from rest_framework import status

@api_view(["GET", "POST"])
def createCustomer(request):
    print("hello")
    if request.method == "POST":
        data = request.data
        print(data)
        id_ = ""
        customer = ""
        if 'id' in data.keys():
            print("in edit")
            id_ = data["id"]
            customer = Customer.objects.get(id = id_)
        else:
            id_ = str(uuid.uuid4())
            customer = Customer(id=id_)
        data.pop("id")
        for k, v in data.items():
            setattr(customer, k, v)
        customer.save()
        serialzer = CustomerSerializer(customer)
        return JsonResponse(serialzer.data, safe=False)
    if request.method == "GET":
        data = Customer.objects.all()
        serializer = CustomerSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(["GET"])
def searchCustomers(request):
    if request.method == "GET":
        string = request.GET.getlist("search")[0]
        if string == "":
            data = Customer.objects.all()
            serializer = CustomerSerializer(data, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            data = Customer.objects.filter(customer__icontains=string)
            serializer = CustomerSerializer(data, many=True)
            return JsonResponse(serializer.data, safe=False)
    return HttpResponse("customer not found", status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getCustomer(request, pk):
    if request.method == "GET":
        data = Customer.objects.filter(pk=pk)
        serializer = CustomerSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse("customer not found", status=status.HTTP_404_NOT_FOUND)


