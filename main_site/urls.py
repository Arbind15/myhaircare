from django.urls import path

from . import views

urlpatterns = [
    path('home/', views.Home, name='home'),
    path('login/', views.Login, name='login'),
    path('savesurvey/', views.saveSurvey, name='save_survey'),
]
