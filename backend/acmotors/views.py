from rest_framework.decorators import api_view
import uuid
from .models import *
from .serializer import *
from django.http import JsonResponse,HttpResponse
from rest_framework import status
from . import models
from .serializer import *

@api_view(["POST"])
def addAcMotors(request):
    if request.method == "POST":
        data = request.data
        id_ = str(uuid.uuid4())
        newMotor = ACMotors(id=id_)
        for k, v in data.items():
            setattr(newMotor, k, v)
        print(newMotor)
        newMotor.save()
        serializer = AcMotorSerializer(newMotor)
        return JsonResponse(serializer.data, safe=False)

@api_view(["GET"])  
def searchAcMotors(request):
    if request.method == "GET":
        obj = dict(request.GET)
        print(obj)
        data = ACMotors.objects.filter(volts=obj["volts"][0],frame=obj["frame"][0],hpkw=obj["hpkw"][0],enclosure=obj["enclosure"][0],rpm=obj["rpm"][0])
        serializer = AcMotorSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(["POST"])
def addNewJob(request):
    if request.method == "POST":
        data = request.data
        motor = ACMotors.objects.filter(id=data["motor"]).first()
        customerObj = Customer.objects.filter(id=data["customer"]).first()
        data.pop('motor')
        data.pop('customer')
        newJob = ACMotorJobDetails.objects.create(motor=motor, customer=customerObj)
        for k, v in data.items():
            setattr(newJob, k, v)
        newJob.save()
        serializer = AcMotorJobSerializer(newJob)
        return JsonResponse(serializer.data, safe=False)
    
@api_view(["GET"])  
def findJob(request, pk):
    if request.method == "GET":
        data = ACMotorJobDetails.objects.filter(pk=pk)[0]
        serializer = AcMotorJobSerializer(data, many=False)
        return JsonResponse(serializer.data, safe=False)

@api_view(["GET"])
def getMotorById(request, pk):
    if request.method == "GET":
        data = ACMotors.objects.filter(pk=pk)
        serializer = AcMotorSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse("customer not found", status=status.HTTP_404_NOT_FOUND)

@api_view(["POST", "GET"])
def addConditionAssesment(request, pk):
    if request.method == "POST":
        data = request.data
        job = ACMotorJobDetails.objects.filter(id=pk).first()
        newCondition = AcConditionAssessment.objects.create(job=job, id=job.id)
        for k, v in data.items():
            setattr(newCondition, k, v)
        newCondition.save()
        job.step = "scope2"
        job.save()
        serializer = AcConditonSerializer(newCondition)
        return JsonResponse(serializer.data, safe=False)
    if request.method == "GET":
        data = AcConditionAssessment.objects.filter(id=pk)[0]
        serializer = AcConditonSerializer(data, many=False)
        return JsonResponse(serializer.data, safe=False)


@api_view(["POST", "GET"])
def addDismantleInspection(request, pk):
    if request.method == "POST":
        data = request.data
        job = ACMotorJobDetails.objects.filter(id=pk).first()
        newCondition = AcDismantleInspection.objects.create(job=job, id = pk)
        for k, v in data.items():
            setattr(newCondition, k, v)
        newCondition.save()
        job.step = "comments"
        job.save()
        serializer = AcDismantleInspectionSerializer(newCondition)
        return JsonResponse(serializer.data, safe=False)
    if request.method == "GET":
        data = AcDismantleInspection.objects.filter(id=pk)[0]
        serializer = AcDismantleInspectionSerializer(data, many=False)
        return JsonResponse(serializer.data, safe=False)
    
@api_view(["POST", "GET"])
def comments(request, pk):
    if request.method == "POST":
        data = request.data
        job = ACMotorJobDetails.objects.filter(id=pk).first()
        comments = Comments.objects.create(job=job, id = pk)
        for k, v in data.items():
            setattr(comments, k, v)
        comments.save()
        job.step = "print"
        job.save()
        serializer = CommentsSerializer(comments)
        return JsonResponse(serializer.data, safe=False)
    if request.method == "GET":
        data = Comments.objects.filter(id=pk)[0]
        serializer = CommentsSerializer(data, many=False)
        return JsonResponse(serializer.data, safe=False)
    