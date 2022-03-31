# Generated by Django 3.2.12 on 2022-03-31 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_name', models.CharField(default='', max_length=255)),
                ('deadline', models.DateField(default=None)),
                ('description', models.CharField(default='', max_length=255)),
            ],
        ),
    ]
