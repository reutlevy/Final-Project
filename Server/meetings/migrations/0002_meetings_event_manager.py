# Generated by Django 3.2.12 on 2022-03-31 10:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('meetings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='meetings',
            name='event_manager',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='meetings', to='users.eventmanager'),
        ),
    ]
