# Generated by Django 5.1.3 on 2024-11-21 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transcribers', '0002_transcribemodel_audioid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transcribemodel',
            name='audiofile',
            field=models.FileField(upload_to='uploads/'),
        ),
    ]