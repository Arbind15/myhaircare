import json, csv
import os

import requests
from django.http import HttpResponseRedirect, JsonResponse

from MyHair.settings import MEDIA_ROOT
from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import SurveyData, DrProfile
from .generate_csv import streaming_csv_view
from . import train, predict
from .models import Page_Parameter
from django.contrib.auth.models import User


def test(request):
    if request.method == 'GET':
        train.LR_train_manual()
        return render(request, 'main_site/test.html', {})
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def Home(request):
    if request.method == 'GET':
        try:
            cur_usr=request.user.id
            cur_usr_pro=DrProfile.objects.get(username=cur_usr)
            return render(request, 'main_site/home.html', {"user": cur_usr,"profile": cur_usr_pro})
        except:
            HttpResponse('Forbidden')
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def adminSite(request):
    if request.method == 'GET':
        page_parms=Page_Parameter.objects.all()
        cur_algo="ann"
        if(len(page_parms)<=0):
            Page_Parameter.objects.create(Current_Alogorithm="ann")
        else:
            cur_algo=page_parms[0].Current_Alogorithm
        return render(request, 'main_site/admin_site.html', {'cur_sel':cur_algo})
    else:
        return HttpResponse('Forbidden')


def userHome(request):
    if request.method == 'GET':
        return render(request, 'main_site/user_home.html', {})
    else:
        return HttpResponse('Forbidden')


def drSurveyHome(request):
    if request.method == 'GET':
        return render(request, 'main_site/dr_survey_home.html', {})
    else:
        return HttpResponse('Forbidden')


def userSurvey(request):
    if request.method == 'GET':
        return render(request, 'main_site/user_survey.html', {})
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def drHome(request):
    if request.method == 'GET':
        return render(request, 'main_site/dr_survey.html', {})
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def myContrib(request):
    if request.method == 'GET':
        try:
            return render(request, 'main_site/contrib.html', {"contrib": DrProfile.objects.get(username=request.user.id).Contributions})
        except:
            return HttpResponse('Forbidden')
    else:
        return HttpResponse('Forbidden')


def Login(request):
    if request.method == 'GET':
        return render(request, 'main_site/login.html', {})
    elif request.method == 'POST':
        username = request.POST.get('lic_num')
        password = request.POST.get('password')
        next_url = request.GET.get('next')
        user = authenticate(username=username, password=password)
        # print('next',next_url)
        if user is not None:
            login(request, user)
            if next_url:
                return HttpResponseRedirect(next_url)
            return redirect('home')
        else:
            messages.error(request, f'Incorrect Licence number or password!')
            return render(request, 'main_site/login.html')
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def saveSurvey(request):
    if request.method == 'POST':
        try:
            # data = json.loads(request.POST.get('survey'))    this will give csrf token error after deployment so do like below

            data = json.loads(request.POST['survey'])

            # print(data,type(data))
            data_loc = os.path.join(MEDIA_ROOT, 'survey_data')
            data_loc = data_loc + '/' + 'hair_fall_dataset.csv'
            with open(data_loc, 'a', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(data)
            return HttpResponse("Saved")
        except:
            return HttpResponse("Error")
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def saveSurveyDB(request):
    if request.method == 'POST':
        try:
            # data = json.loads(request.POST.get('survey'))    this will give csrf token error after deployment so do like below
            data = json.loads(request.POST['survey'])
            # print(data,type(data))
            # print('survey data: ',data)
            tmp = SurveyData(Gender=data[0],
                             Age=data[1],
                             Marital_Status=data[2],
                             Father=data[3],
                             Mother=data[4],
                             Grand_Father=data[5],
                             Grand_Mother=data[6],
                             Siblings=data[7],
                             Pregnant=data[8],
                             Radiation=data[9],
                             Hairline_Pattern=data[10],
                             Hairstyle=data[11],
                             Density=data[12],
                             Hair_Fall_Rate=data[13],
                             Scalp_Infection=data[14],
                             Pain_Itch=data[15],
                             Nutrition=data[16],
                             Weight_Loss=data[17],
                             Sleeping_Pattern=data[18],
                             Chemical_Products=data[19],
                             Medication=data[20],
                             Region=data[21],
                             Label=data[22]
                             )
            tmp.save()
            SurveyData.refresh_from_db(tmp)
            cur_usr=DrProfile.objects.get(username=request.user)
            cur_usr.Contributions=int(cur_usr.Contributions)+1
            cur_usr.save()
            DrProfile.refresh_from_db(cur_usr)
            # print(data[:22],len(data[:22]))
            # print(data[22])
            # train.LR_train_onFly([data[:22]], [data[22]])
            return HttpResponse("Saved")
        except:
            return HttpResponse("Error")

    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def getCSV(request):
    return streaming_csv_view(request)


@login_required(login_url='login')
def uploadCSV(request):
    if request.method == 'POST':
        try:
            # print(request.FILES)
            # print(request.FILES['csv'])
            csv_file = request.FILES['csv']
            decoded_file = csv_file.read().decode('utf-8').splitlines()
            # print(decoded_file)
            for data in decoded_file[1:]:
                data = data.split(',')
                tmp = SurveyData(Gender=data[0],
                                 Age=data[1],
                                 Marital_Status=data[2],
                                 Father=data[3],
                                 Mother=data[4],
                                 Grand_Father=data[5],
                                 Grand_Mother=data[6],
                                 Siblings=data[7],
                                 Pregnant=data[8],
                                 Radiation=data[9],
                                 Hairline_Pattern=data[10],
                                 Hairstyle=data[11],
                                 Density=data[12],
                                 Hair_Fall_Rate=data[13],
                                 Scalp_Infection=data[14],
                                 Pain_Itch=data[15],
                                 Nutrition=data[16],
                                 Weight_Loss=data[17],
                                 Sleeping_Pattern=data[18],
                                 Chemical_Products=data[19],
                                 Medication=data[20],
                                 Region=data[21],
                                 Label=data[22]
                                 )
                tmp.save()
                SurveyData.refresh_from_db(tmp)
            # reader = csv.DictReader(decoded_file)
            # for i in reader:
            #     print(i)
            return JsonResponse({
                "message": "Uploaded",
                "details": "Successfully uploaded CSV file!"
            }, safe=False)
        except:
            return JsonResponse({
                "message": "Error",
            }, safe=False)
    else:
        return HttpResponse('Forbidden')


def userResult(request, per):
    if request.method == 'GET':
        # print(per)
        return render(request, 'main_site/user_result.html', {'per': float(per)})
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def ANN_Train(request):
    if request.method == 'POST':
        try:
            accuracy = train.ANN_Train_Manual()
            return JsonResponse({
                "message": "Trained",
                "details": "Training complete with accuracy: " + str(accuracy)+"%"
            }, safe=False)
        except:
            return JsonResponse({
                "message": "Error",
            }, safe=False)
    else:
        return HttpResponse('Forbidden')


def predictMyFall(request):
    if request.method == 'POST':
        data = json.loads(request.POST['survey'])
        # print(len(data), data)
        # print(data,type(data))
        # data_loc = os.path.join(MEDIA_ROOT, 'survey_data')
        # data_loc=data_loc+'/'+'hair_fall_dataset.csv'
        # with open(data_loc, 'a',newline='') as f:
        #     writer = csv.writer(f)
        #     writer.writerow(data)
        data = list(map(int, data))

        cur_algo=Page_Parameter.objects.all()
        if(len(cur_algo)<=0 or cur_algo[0].Current_Alogorithm=="ann"):
            per = predict.ANN_Predict([data])
        else:
            per=predict.RF_Predict([data])

        return JsonResponse({
            "message": "predicted",
            "percent": str(per)
        }, safe=False)

    else:
        return HttpResponse('Forbidden')


def onFlyPredict(request):
    if request.method == 'POST':
        data = json.loads(request.POST['survey'])
        data = list(map(int, data))
        per = predict.ANN_Predict([data])
        if per >= 50.0:
            per = "high, data: " + str(data)
        else:
            per = "low, data: " + str(data)
        return JsonResponse({
            "message": "predicted",
            "percent": str(per)
        }, safe=False)
    else:
        return HttpResponse('Forbidden')


def onFlySave(request):
    if request.method == 'GET':
        # print(per)
        return render(request, 'main_site/onflylearning.html', {})
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def RF_Train(request):
    if request.method == 'POST':
        try:
            accuracy = train.RF_Train_manual()
            return JsonResponse({
                "message": "Trained",
                "details": "Training complete with accuracy: " + str(accuracy)+"%"
            }, safe=False)
        except:
            return JsonResponse({
                "message": "Error",
            }, safe=False)
    else:
        return HttpResponse('Forbidden')


@login_required(login_url='login')
def ChangeAlgo(request):
    if request.method == 'POST':
        try:
            cur_val = request.POST['sel']
            algo = Page_Parameter.objects.all()
            if len(algo) <= 0:
                Page_Parameter.objects.create(Current_Alogorithm=cur_val)
            else:
                algo[0].Current_Alogorithm = cur_val
                algo[0].save()
                Page_Parameter.refresh_from_db(algo[0])
            return JsonResponse({
                "message": "Changed",
                "details": "Algorithm changed to: Artificial Neural Network" if cur_val == "ann" else "Algorithm "
                                                                                                      "changed to: "
                                                                                                      "Random Forest "
            }, safe=False)
        except:
            return JsonResponse({
                "message": "Error",
            }, safe=False)
    else:
        return HttpResponse('Forbidden')
