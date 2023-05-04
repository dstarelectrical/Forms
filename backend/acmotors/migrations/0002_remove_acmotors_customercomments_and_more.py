# Generated by Django 4.1.6 on 2023-04-28 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='acmotors',
            name='customerComments',
        ),
        migrations.RemoveField(
            model_name='acmotors',
            name='date',
        ),
        migrations.RemoveField(
            model_name='acmotors',
            name='partsMissing',
        ),
        migrations.RemoveField(
            model_name='acmotors',
            name='pictures',
        ),
        migrations.RemoveField(
            model_name='acmotors',
            name='signature',
        ),
        migrations.AddField(
            model_name='acmotorjobdetails',
            name='customerComments',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='acmotorjobdetails',
            name='partsMissing',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='acmotorjobdetails',
            name='pictues',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AddField(
            model_name='acmotorjobdetails',
            name='signature',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AddField(
            model_name='acmotors',
            name='cycles',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AlterField(
            model_name='acmotorjobdetails',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
