from django.contrib import admin
from .models import SurveyData,LRModel, ANN_Model,Page_Parameter, DrProfile
admin.site.register(SurveyData)
admin.site.register(LRModel)
admin.site.register(ANN_Model)
admin.site.register(Page_Parameter)
admin.site.register(DrProfile)