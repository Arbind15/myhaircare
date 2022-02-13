import json,csv
import os

from MyHair.settings import MEDIA_ROOT
from django.shortcuts import render, HttpResponse

def Home(request):
    if request.method == 'GET':
        return render(request,'main_site/dr_survey.html',{})
    else:
        return HttpResponse('Forbidden')

def Login(request):
    if request.method == 'GET':
        return render(request,'main_site/login.html',{})
    else:
        return HttpResponse('Forbidden')

def saveSurvey(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.POST.get('survey'))
            # print(data,type(data))
            data_loc = os.path.join(MEDIA_ROOT, 'survey_data')
            data_loc=data_loc+'/'+'hair_fall_dataset.csv'
            with open(data_loc, 'a',newline='') as f:
                writer = csv.writer(f)
                writer.writerow(data)
            return HttpResponse("Saved")
        except:
            return HttpResponse("Error")
    else:
        return HttpResponse('Forbidden')
