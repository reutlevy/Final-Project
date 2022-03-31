# Generated by Django 3.2.12 on 2022-03-31 17:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='event_manager',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task', to='users.eventmanager'),
        ),
    ]
