from django.urls import path

from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.userHome, name='user_home'),
    path('home/', views.Home, name='home'),
    path('login/', views.Login, name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='main_site/login.html'), name='logout'),
    path('drsurvey/', views.drHome, name='dr_survey'),
    path('savesurvey/', views.saveSurvey, name='save_survey'),
    path('mycontrib/', views.myContrib, name='my_contrib'),
    path('usersurvey/', views.userSurvey, name='user_survey'),

    path('predictmyfall/', views.predictMyFall, name='predict_my_fall'),
]
