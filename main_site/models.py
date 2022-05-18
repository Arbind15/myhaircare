from django.db import models


class SurveyData(models.Model):
    Gender = models.IntegerField()
    Age = models.IntegerField()
    Marital_Status = models.IntegerField()
    Father = models.IntegerField()
    Mother = models.IntegerField()
    Grand_Father = models.IntegerField()
    Grand_Mother = models.IntegerField()
    Siblings = models.IntegerField()
    Pregnant = models.IntegerField()
    Radiation = models.IntegerField()
    Hairline_Pattern = models.IntegerField()
    Hairstyle = models.IntegerField()
    Density = models.IntegerField()
    Hair_Fall_Rate = models.IntegerField()
    Scalp_Infection = models.IntegerField()
    Pain_Itch = models.IntegerField()
    Nutrition = models.IntegerField()
    Weight_Loss = models.IntegerField()
    Sleeping_Pattern = models.IntegerField()
    Chemical_Products = models.IntegerField()
    Medication = models.IntegerField()
    Region = models.IntegerField()
    Label = models.IntegerField()

    def __str__(self):
        return f'{self.id}'


class LRModel(models.Model):
    model = models.BinaryField()
