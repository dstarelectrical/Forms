# Generated by Django 4.1.6 on 2023-05-01 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0006_acmotorjobdetails_specificdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acmotorjobdetails',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]