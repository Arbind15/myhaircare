from django.urls import path

from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # path('', views.test, name='test'),
    path('', views.userHome, name='user_home'),
    path('drsurveyhome/', views.drSurveyHome, name='dr_survey_home'),
    path('home/', views.Home, name='home'),
    path('login/', views.Login, name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='main_site/login.html'), name='logout'),
    path('drsurvey/', views.drHome, name='dr_survey'),
    path('savesurvey/', views.saveSurveyDB, name='save_survey'),
    path('mycontrib/', views.myContrib, name='my_contrib'),
    path('usersurvey/', views.userSurvey, name='user_survey'),
    path('adminsite/', views.adminSite, name='admin_site'),
    path('getcsv/', views.getCSV, name='get_csv'),
    path('userresult/<per>', views.userResult, name='user_result'),
    path('test/', views.test, name='test'),

    path('predictmyfall/', views.predictMyFall, name='predict_my_fall'),
]
