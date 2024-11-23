# Generated by Django 5.1.3 on 2024-11-13 15:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_alter_usermodel_userpassword'),
    ]

    operations = [
        migrations.CreateModel(
            name='TranscribeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('audiofile', models.TextField()),
                ('content', models.TextField()),
                ('userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.usermodel')),
            ],
        ),
    ]
