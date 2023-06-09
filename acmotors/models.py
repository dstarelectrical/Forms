from django.db import models
import uuid
from customer.models import Customer

class ACMotors(models.Model):
    id = models.CharField(primary_key=True,editable=False,default=uuid.uuid4, max_length=255) 
    manufacturer = models.CharField(blank=True, max_length=250,null=True)
    serial = models.CharField(blank=True, max_length=250,null=True)
    model = models.CharField(blank=True, max_length=250,null=True)
    rpm = models.CharField(blank=True, max_length=250,null=True)
    frame =  models.CharField(blank=True, max_length=250,null=True)
    hpkw = models.CharField(blank=True, max_length=250,null=True)
    hpkwValue = models.CharField(blank=True, max_length=250,null=True)
    volts = models.CharField(blank=True, max_length=250,null=True)
    amps = models.CharField(blank=True, max_length=250,null=True)
    phase = models.CharField(blank=True, max_length=250,null=True)
    _class = models.CharField(blank=True, max_length=250,null=True)
    ambTemp = models.CharField(blank= True, max_length=250,null=True)
    timeRating = models.CharField(blank=True, max_length=250,null=True)
    div = models.CharField(blank=True, max_length=250,null=True)
    enclosure = models.CharField(blank=True, max_length=250,null=True)
    eyebolt = models.CharField(blank=True, max_length=250,null=True)
    fittedWith = models.CharField(blank=True, max_length=250, null=True)
    inOut = models.CharField(blank=True, max_length=250, null=True)
    measurement = models.CharField(blank=True, max_length=250, null=True)
    cycles = models.CharField(blank=True, max_length=250,default='',null=True)
    enclosureOther = models.CharField(blank=True, max_length=250, default='',null=True)
    fittedWithOther = models.CharField(blank=True, max_length=250, default='',null=True)


class ACMotorJobDetails(models.Model):
    id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, related_name="job", on_delete=models.PROTECT, default=None)
    motor = models.ForeignKey(ACMotors, related_name="motor", on_delete=models.PROTECT, default=None)
    specificDate = models.CharField(max_length=250,default='',null=True)
    equipment = models.CharField(blank=True, max_length=250,null=True)
    application = models.CharField(blank=True, max_length=250,null=True)
    urgency = models.CharField(blank=True, max_length=250,null=True)
    quote = models.CharField(blank=True, max_length=250,null=True)
    po_num = models.CharField(blank=True, max_length=250,null=True)
    customerComments = models.CharField(blank=True, max_length=1000,null=True)
    partsMissing = models.CharField(blank=True, max_length=1000,null=True)
    pictures = models.CharField(blank=True, max_length=250, default='',null=True)
    signature = models.CharField(blank=True, max_length=250, default='',null=True)
    date = models.DateTimeField(auto_now_add=True)
    app_other = models.CharField(null=True, max_length=250, default='')
    status = models.CharField(blank=True, max_length=250, default="",null=True)
    step = models.CharField(blank=True, max_length=250, default="",null=True)
    eyeboltDamaged = models.CharField(blank=True, max_length=250,null=True)

class AcConditionAssessment(models.Model):
    id = models.AutoField(primary_key=True)
    job = models.ForeignKey(ACMotorJobDetails, related_name="condition", on_delete=models.CASCADE, default=None)
    visual = models.BooleanField(default=False)
    pictures = models.BooleanField(default=False)
    missing = models.BooleanField(default=False)
    broken = models.BooleanField(default=False)
    electrical = models.BooleanField(default=False)
    insulation = models.BooleanField(default=False)
    winding = models.BooleanField(default=False)
    turn = models.BooleanField(default=False)
    auxiliary = models.BooleanField(default=False)
    heater = models.BooleanField(default=False)
    comments = models.CharField(blank=True, max_length=250, default='')
    signature = models.CharField(blank=True, max_length=250, default='',null=False)
    
class AcDismantleInspection(models.Model):
    id = models.AutoField(primary_key=True)
    job = models.ForeignKey(ACMotorJobDetails, related_name="dismantle", on_delete=models.CASCADE, default=None)
    dismantle = models.BooleanField(default=False)
    pictures = models.BooleanField(default=False)
    mechanical = models.BooleanField(default=False)
    bearings = models.BooleanField(default=False)
    oil = models.BooleanField(default=False)
    mechFit = models.BooleanField(default=False)
    failure = models.BooleanField(default=False)
    electrical = models.BooleanField(default=False)
    insulation = models.BooleanField(default=False)
    winding = models.BooleanField(default=False)
    surge = models.BooleanField(default=False)
    recordData = models.BooleanField(default=False)
    comments = models.CharField(blank=True, max_length=250, default='')
    signature = models.CharField(blank=True, max_length=250, default='',null=False)

class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    job = models.ForeignKey(ACMotorJobDetails, related_name="comments", on_delete=models.CASCADE, default=None)
    comments = models.CharField(blank=True, max_length=10000)