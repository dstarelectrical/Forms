# Generated by Django 4.1.6 on 2023-04-28 16:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ACMotorJobDetails',
            fields=[
                ('id', models.CharField(default=uuid.uuid4, editable=False, max_length=255, primary_key=True, serialize=False)),
                ('date', models.CharField(max_length=250)),
                ('equipment', models.CharField(max_length=250)),
                ('application', models.CharField(max_length=250)),
                ('urgency', models.CharField(max_length=250)),
                ('quote', models.CharField(max_length=250)),
                ('job_num', models.CharField(max_length=250)),
                ('po_num', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='ACMotors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=250)),
                ('serial', models.CharField(max_length=250)),
                ('model', models.CharField(max_length=250)),
                ('rpm', models.CharField(max_length=250)),
                ('frame', models.CharField(max_length=250)),
                ('hpkw', models.CharField(max_length=250)),
                ('volts', models.CharField(max_length=250)),
                ('amps', models.CharField(max_length=250)),
                ('phase', models.CharField(max_length=250)),
                ('_class', models.CharField(max_length=250)),
                ('ambTemp', models.CharField(max_length=250)),
                ('timeRating', models.CharField(max_length=250)),
                ('div', models.CharField(max_length=250)),
                ('enclosure', models.CharField(max_length=250)),
                ('eyebolt', models.CharField(max_length=250)),
                ('fittedwith', models.CharField(max_length=250)),
                ('inOut', models.CharField(max_length=250)),
                ('measurement', models.CharField(max_length=250)),
                ('customerComments', models.CharField(max_length=1000)),
                ('partsMissing', models.CharField(max_length=1000)),
                ('pictures', models.CharField(max_length=250)),
                ('signature', models.CharField(max_length=250)),
                ('date', models.CharField(max_length=250)),
            ],
        ),
    ]
