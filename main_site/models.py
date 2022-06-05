from django.db import models
from PIL import Image
from django.utils import timezone
from django.contrib.auth.models import User


class DrProfile(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='username', primary_key=True)
    Full_Name=models.CharField(max_length=500,default="")
    Phone_Number = models.CharField(max_length=14, default="")
    Date = models.DateField(default=timezone.now())
    Profile_Picture = models.ImageField(default='default.png', upload_to='user_pics')
    Contributions = models.IntegerField(default=0)
    Status = models.TextField(max_length=100, default="")

    def __str__(self):
        return f'{self.username.username} -dr_profile'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img1 = Image.open(self.Profile_Picture.path)
        img1.thumbnail((200, 200))
        img1.save(self.Profile_Picture.path)


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


class ANN_Model(models.Model):
    model = models.BinaryField()


class Page_Parameter(models.Model):
    Current_Alogorithm = models.CharField(max_length=500, default="ann")
