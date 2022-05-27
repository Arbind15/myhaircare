from django.contrib import admin
from .models import SurveyData,LRModel, ANN_Model
admin.site.register(SurveyData)
admin.site.register(LRModel)
admin.site.register(ANN_Model)