# Generated by Django 4.1.6 on 2023-05-04 16:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0017_alter_comments_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='job',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='acmotors.acmotorjobdetails'),
        ),
    ]