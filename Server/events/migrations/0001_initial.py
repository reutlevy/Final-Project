# Generated by Django 3.2.12 on 2022-03-31 17:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DummyEventOwner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DummySupplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=255)),
                ('job', models.CharField(max_length=255)),
                ('price', models.PositiveIntegerField()),
                ('has_paid', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=255)),
                ('event_name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('budget', models.PositiveIntegerField()),
                ('location', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='EventSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('description', models.CharField(max_length=255)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_schedules', to='events.event')),
            ],
        ),
    ]
