# Generated by Django 4.1.6 on 2023-04-28 20:09

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0002_remove_acmotors_customercomments_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acmotors',
            name='id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=255, primary_key=True, serialize=False),
        ),
    ]
