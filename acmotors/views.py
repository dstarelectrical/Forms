from rest_framework.decorators import api_view
import uuid
from .models import *
from .serializer import *
from django.http import JsonResponse,HttpResponse
from rest_framework import status
from . import models
from .serializer import *

def filterMotors(data):
    motors = ACMotors.objects.filter(manufacturer=data["manufacturer"],
                                    serial=data["serial"],
                                    model=data["model"],
                                    rpm=data["rpm"],
                                    frame=data["frame"],
                                    hpkw=data["hpkw"],
                                    hpkwValue=data["hpkwValue"],
                                    volts=data["volts"],
                                    amps=data["amps"],
                                    phase=data["phase"],
                                    _class=data["_class"],
                                    ambTemp=data["ambTemp"],
                                    timeRating=data["timeRating"],
                                    cycles=data["cycles"],
                                    div=data["div"],
                                    enclosure=data["enclosure"],
                                    eyebolt=data["eyebolt"],
                                    fittedWith=data["fittedWith"],
                                    inOut=data["inOut"],
                                    measurement=data["measurement"],
                                    enclosureOther=data["encloseOther"],
                                    fittedWithOther=data["fittedOther"],
                                )
    return motors

@api_view(["POST"])
def addAcMotors(request):
    if request.method == "POST":
        data = request.data
        # check to determite edit or add
        print(data)
        if 'id' in data.keys():
            print("in edit")
            oldMotorId = data["id"]
            oldMotor = ACMotors.objects.filter(id=oldMotorId).first()
            jobs = ACMotorJobDetails.objects.filter(motor=oldMotor)
            currentJob = ACMotorJobDetails.objects.filter(id=data["jobId"]).first()
            # check to determine if a new motor needs to be created or edit the current one
            print("len", len(jobs))
            if len(jobs) > 1 or len(jobs) == 0:
                print("more than one job")
                # check if the motor is unique
                motors = filterMotors(data)
                if len(motors) == 1:
                    # if the motor is not unique assign the existing motor to the current job
                    print("print reassign new motor")
                    currentJob.motor = motors.first()
                    currentJob.save()
                    job = AcMotorJobSerializer(currentJob)
                    return JsonResponse(job.data, status=status.HTTP_200_OK)
                elif len(motors) == 0:
                    # if motor is unique, create a new job and assign it to the current job
                    print("new motor")
                    id_ = str(uuid.uuid4())
                    newMotor = ACMotors(id=id_)
                    data.pop("id")
                    for k, v in data.items():
                        setattr(newMotor, k, v)
                    print(newMotor)
                    newMotor.save()
                    currentJob.motor = newMotor
                    currentJob.save()
                    job = AcMotorJobSerializer(currentJob)
                    serializer = AcMotorSerializer(newMotor)
                    results = {"job" : job.data, "motor": serializer.data }
                    return JsonResponse(results, status=status.HTTP_200_OK)
            elif len(jobs) == 1:
                print("just one job")
                if (jobs.first() == currentJob):
                    print("editing the correct job")
                    motors = filterMotors(data)
                    if len(motors) == 0:
                        print("0")
                        for k, v in data.items():
                            setattr(oldMotor, k, v)
                        oldMotor.save()
                        serializer = AcMotorSerializer(oldMotor)
                        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
                    elif len(motors) == 1:
                        print("1")
                        currentJob.motor = motors.first()
                        currentJob.save()
                        oldMotor.delete()
                        return HttpResponse("reassined to a different motor", status=status.HTTP_200_OK)
            return HttpResponse("error", status=status.HTTP_400_BAD_REQUEST)
        else:
            print("in add")
            motors = filterMotors(data)
            if len(motors) == 0:
                id_ = str(uuid.uuid4())
                newMotor = ACMotors(id=id_)
                for k, v in data.items():
                    setattr(newMotor, k, v)
                print(newMotor)
                newMotor.save()
                serializer = AcMotorSerializer(newMotor)
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return HttpResponse("motor already exists", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])  
def searchAcMotors(request):
    if request.method == "GET":
        obj = dict(request.GET)
        print(obj)
        data = ACMotors.objects.filter(volts=obj["volts"][0],frame=obj["frame"][0],hpkw=obj["hpkw"][0],enclosure=obj["enclosure"][0],rpm=obj["rpm"][0], hpkwValue=obj["hpkwValue"][0])
        serializer = AcMotorSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(["POST", "PUT"])
def addNewJob(request):
    if request.method == "POST":
        data = request.data
        id_ = ""
        newJob = ""
        if 'id' in data.keys():
            print("in edit")
            id_ = data["id"]
            newJob = ACMotorJobDetails.objects.get(id = id_)
        else:
            id_ = str(uuid.uuid4())
            motor = ACMotors.objects.filter(id=data["motor"]).first()
            customerObj = Customer.objects.filter(id=data["customer"]).first()
            newJob = ACMotorJobDetails.objects.create(motor=motor, customer=customerObj) 
        data.pop('motor')
        data.pop('customer')
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
        print(data)
        if data["signature"] == "" or data["signature"] == None:
            return HttpResponse("you need to add a signature", status=status.HTTP_403_FORBIDDEN)
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
        print(data)
        if data["signature"] == "" or data["signature"] == None:
            return HttpResponse("you need to add a signature", status=status.HTTP_403_FORBIDDEN)
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
    