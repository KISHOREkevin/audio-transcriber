# Generated by Django 5.1.3 on 2024-11-21 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transcribers', '0003_alter_transcribemodel_audiofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transcribemodel',
            name='audiofile',
            field=models.TextField(),
        ),
    ]
