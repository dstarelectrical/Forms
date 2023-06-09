from rest_framework import serializers
from . import models

class AcMotorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ACMotors
        fields = ['id','manufacturer', 'serial', 'model', 'rpm', 'frame','hpkw','volts','amps','phase','_class','ambTemp','timeRating','div','enclosure','eyebolt','fittedWith','inOut','measurement','enclosureOther','fittedWithOther', 'cycles', 'hpkwValue']

class AcMotorJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ACMotorJobDetails
        fields = ['id', 'specificDate', 'equipment','application','urgency', 'quote', 'po_num', 'customerComments', 'partsMissing', 'pictures', 'signature', 'date', 'customer', 'motor', 'app_other', 'step','status']


class AcConditonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AcConditionAssessment
        fields = ['id','comments', 'job', 'visual', 'pictures', 'missing', 'broken', 'electrical', 'insulation', 'winding', 'turn', 'auxiliary', 'heater', 'signature']

class AcDismantleInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AcDismantleInspection
        fields = ['id','comments', 'job', 'dismantle','mechanical', 'pictures', 'bearings', 'oil', 'mechFit', 'failure', 'electrical', 'insulation', 'winding', 'surge', 'recordData', 'signature']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comments
        fields = ['id', 'job', 'comments']