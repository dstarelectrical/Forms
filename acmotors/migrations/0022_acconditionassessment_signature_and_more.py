# Generated by Django 4.1.6 on 2023-05-04 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0021_alter_acmotorjobdetails_application_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='acconditionassessment',
            name='signature',
            field=models.CharField(blank=True, default='', max_length=250),
        ),
        migrations.AddField(
            model_name='acdismantleinspection',
            name='signature',
            field=models.CharField(blank=True, default='', max_length=250),
        ),
    ]