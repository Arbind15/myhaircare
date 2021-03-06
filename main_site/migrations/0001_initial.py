# Generated by Django 4.0.2 on 2022-05-16 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SurveyData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Gender', models.IntegerField()),
                ('Age', models.IntegerField()),
                ('Marital_Status', models.IntegerField()),
                ('Father', models.IntegerField()),
                ('Mother', models.IntegerField()),
                ('Grand_Father', models.IntegerField()),
                ('Grand_Mother', models.IntegerField()),
                ('Siblings', models.IntegerField()),
                ('Pregnant', models.IntegerField()),
                ('Radiation', models.IntegerField()),
                ('Hairline_Pattern', models.IntegerField()),
                ('Hairstyle', models.IntegerField()),
                ('Density', models.IntegerField()),
                ('Hair_Fall_Rate', models.IntegerField()),
                ('Scalp_Infection', models.IntegerField()),
                ('Pain_Itch', models.IntegerField()),
                ('Nutrition', models.IntegerField()),
                ('Weight_Loss', models.IntegerField()),
                ('Sleeping_Pattern', models.IntegerField()),
                ('Chemical_Products', models.IntegerField()),
                ('Medication', models.IntegerField()),
                ('Region', models.IntegerField()),
                ('Label', models.IntegerField()),
            ],
        ),
    ]
