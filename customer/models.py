from django.db import models
import uuid

# Create your models here.
class Customer(models.Model):
    id = models.CharField(primary_key=True,editable=False,default=uuid.uuid4, max_length=255)
    customer = models.CharField(max_length=250, blank=False, default='')
    email = models.CharField(max_length=250, blank=False, default='')
    phone = models.CharField(max_length=20, blank=False, default='')
    address = models.CharField(max_length=250, blank=False, default='')