# Generated by Django 4.1.6 on 2023-05-04 16:23

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0015_comments_alter_acmotorjobdetails_application_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=255, primary_key=True, serialize=False),
        ),
    ]
