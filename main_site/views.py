import json, csv
import os

from django.http import HttpResponseRedirect, JsonResponse

from MyHair.settings import MEDIA_ROOT
from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


@login_required(login_url='login')
def Home(request):
    if request.method == 'GET':
        return render(request, 'main_site/home.html', {})
    else:
        return HttpResponse('Forbidden')


def userHome(request):
    if request.method == 'GET':
        return render(request, 'main_site/user_home.html', {})
    else:
        return HttpResponse('Forbidden')


def userSurvey(request):
    if request.method == 'GET':
        return render(request, 'main_site/user_survey.html', {})
    else:
        return HttpResponse('Forbidden')


def predictMyFall(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.POST['survey'])
            print(len(data), data)
            # print(data,type(data))
            # data_loc = os.path.join(MEDIA_ROOT, 'survey_data')
            # data_loc=data_loc+'/'+'hair_fall_dataset.csv'
            # with open(data_loc, 'a',newline='') as f:
            #     writer = csv.writer(f)
            #     writer.writerow(data)
            return JsonResponse({
                "message": "predicted",
                "percent": str(55.5)
            }, safe=False)
        except:
            return JsonResponse({
                "message": "error",
                "percent": ''
            }, safe=False)
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
        return render(request, 'main_site/contrib.html', {})
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
