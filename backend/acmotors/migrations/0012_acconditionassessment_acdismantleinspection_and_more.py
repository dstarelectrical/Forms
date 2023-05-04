# Generated by Django 4.1.6 on 2023-05-03 16:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('acmotors', '0011_acconditionassesment'),
    ]

    operations = [
        migrations.CreateModel(
            name='AcConditionAssessment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('visual', models.BooleanField(default=False)),
                ('pictures', models.BooleanField(default=False)),
                ('missing', models.BooleanField(default=False)),
                ('broken', models.BooleanField(default=False)),
                ('electrical', models.BooleanField(default=False)),
                ('insulation', models.BooleanField(default=False)),
                ('winding', models.BooleanField(default=False)),
                ('turn', models.BooleanField(default=False)),
                ('auxiliary', models.BooleanField(default=False)),
                ('heater', models.BooleanField(default=False)),
                ('job', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='condition', to='acmotors.acmotorjobdetails')),
            ],
        ),
        migrations.CreateModel(
            name='AcDismantleInspection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('pictures', models.BooleanField(default=False)),
                ('mechanical', models.BooleanField(default=False)),
                ('bearings', models.BooleanField(default=False)),
                ('oil', models.BooleanField(default=False)),
                ('mechFit', models.BooleanField(default=False)),
                ('failure', models.BooleanField(default=False)),
                ('electrical', models.BooleanField(default=False)),
                ('insulation', models.BooleanField(default=False)),
                ('winding', models.BooleanField(default=False)),
                ('surge', models.BooleanField(default=False)),
                ('recordData', models.BooleanField(default=False)),
                ('job', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='dismantle', to='acmotors.acmotorjobdetails')),
            ],
        ),
        migrations.DeleteModel(
            name='AcConditionAssesment',
        ),
    ]
