from rest_framework import serializers
from . import models

class AcMotorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ACMotors
        fields = ['id','manufacturer', 'serial', 'model', 'rpm', 'frame','hpkw','volts','amps','phase','_class','ambTemp','timeRating','div','enclosure','eyebolt','fittedWith','inOut','measurement','enclosureOther','fittedWithOther', 'cycles']

class AcMotorJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ACMotorJobDetails
        fields = ['id', 'specificDate', 'equipment','application','urgency', 'quote', 'po_num', 'customerComments', 'partsMissing', 'pictures', 'signature', 'date', 'customer', 'motor', 'app_other', 'step','status']


class AcConditonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AcConditionAssessment
        fields = ['id', 'job', 'visual', 'pictures', 'missing', 'broken', 'electrical', 'insulation', 'winding', 'turn', 'auxiliary', 'heater']

class AcDismantleInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AcDismantleInspection
        fields = ['id', 'job', 'dismantle','mechanical', 'pictures', 'bearings', 'oil', 'mechFit', 'failure', 'electrical', 'insulation', 'winding', 'surge', 'recordData']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comments
        fields = ['id', 'job', 'comments']