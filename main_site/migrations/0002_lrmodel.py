# Generated by Django 4.0.2 on 2022-05-17 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_site', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LRModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model', models.BinaryField()),
            ],
        ),
    ]
