import numpy as np
import pandas as pd
import seaborn as sns
import pickle
import matplotlib.pyplot as plt
import matplotlib as mpl
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression,SGDRegressor,SGDClassifier
from sklearn.metrics import confusion_matrix
from .models import LRModel, SurveyData

sns.set_style('dark')


def LR_predict_manual(X_test, Y_test):
    mdls = LRModel.objects.all()
    if len(mdls) <= 0:
        raise Exception
    else:
        raw_model = mdls[0]
        model = pickle.loads(raw_model.model)
        predictions = model.predict_proba(X_test)
        for x in predictions:
            print(x)
        predictions = model.predict(X_test)
        # print(model)
        print(predictions)
        cm = confusion_matrix(Y_test, predictions)
        TN, FP, FN, TP = confusion_matrix(Y_test, predictions).ravel()
        print('True Positive(TP)  = ', TP)
        print('False Positive(FP) = ', FP)
        print('True Negative(TN)  = ', TN)
        print('False Negative(FN) = ', FN)
        accuracy = (TP + TN) / (TP + FP + TN + FN)
        print('Accuracy of the binary classification = {:0.3f}'.format(accuracy))
        return

def LR_predict_onfly(X_test):
    mdls = LRModel.objects.all()
    if len(mdls) <= 0:
        raise Exception
    else:
        raw_model = mdls[0]
        model = pickle.loads(raw_model.model)
        # print(X_test)
        predictions = model.predict_proba(X_test)
        print(predictions)
        percent=round(predictions[0][1]*100,3)
        print(model)
        # print(predictions[0][1])
        # for x in predictions:
        #     print(x[1] * 100)
        predictions = model.predict(X_test)
        print(predictions)
        return percent