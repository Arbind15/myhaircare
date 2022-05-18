import numpy as np
import pandas as pd
import seaborn as sns
import pickle
import matplotlib.pyplot as plt
import matplotlib as mpl
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, SGDRegressor,SGDClassifier
from sklearn.metrics import confusion_matrix
from .models import LRModel, SurveyData
from .predict import LR_predict_manual

sns.set_style('dark')


def LR_train_manual():
    dataset = pd.DataFrame.from_records(SurveyData.objects.all().values())
    X = dataset.drop('Label', axis=1).drop('id', axis=1)
    Y = dataset['Label']
    standardizer = StandardScaler()
    X = standardizer.fit_transform(X)
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)
    # model = LogisticRegression(warm_start=True)
    model = LogisticRegression()
    model.fit(X_train, Y_train)
    mdl_data = pickle.dumps(model)
    tmp_mdl = LRModel.objects.all()
    if len(tmp_mdl) <= 0:
        LRModel.objects.create(model=mdl_data)
    else:
        tmp_mdl[0].model = mdl_data
        tmp_mdl[0].save()

    LR_predict_manual(X_test, Y_test)
    return


def LR_train_onFly(X, Y):
    standardizer = StandardScaler()
    X = standardizer.fit_transform(X)
    mdls = LRModel.objects.all()
    if len(mdls) <= 0:
        model = LogisticRegression()
        model.fit(X, Y)
        mdl_data = pickle.dumps(model)
        LRModel.objects.create(model=mdl_data)
    else:
        raw_model = mdls[0]
        model = pickle.loads(raw_model.model)
        model.fit(X, Y)
        mdl_data = pickle.dumps(model)
        raw_model.model = mdl_data
        raw_model.save()
    return
