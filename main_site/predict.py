import numpy as np
import pandas as pd
import seaborn as sns
import pickle
import matplotlib.pyplot as plt
import matplotlib as mpl
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, SGDRegressor, SGDClassifier
from sklearn.metrics import confusion_matrix
from .models import LRModel, SurveyData, ANN_Model
from keras.models import load_model
from sklearn.preprocessing import StandardScaler
from joblib import dump, load

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
        percent = round(predictions[0][1] * 100, 3)
        print(model)
        # print(predictions[0][1])
        # for x in predictions:
        #     print(x[1] * 100)
        predictions = model.predict(X_test)
        print(predictions)
        return percent


def ANN_Predict(x):
    # mdls = ANN_Model.objects.all()
    # if len(mdls) <= 0:
    #     raise Exception
    # else:
    #     raw_model = mdls[0]
    #     model = pickle.loads(raw_model.model)
    #     # print(X_test)
    #     # predictions = model.predict_proba(x)
    #     # print(predictions)
    #     # percent = round(predictions[0][1] * 100, 3)
    #     print(model)
    #     # print(predictions[0][1])
    #     # for x in predictions:
    #     #     print(x[1] * 100)
    model = load_model('ann_model.h5')
    sc1 = load('std_scaler.bin')
    x = sc1.transform(x)
    # predictions = model.predict(x)
    # predictions=predictions[0][0]
    # print(predictions)
    print(x)
    print(model)
    pred = model.predict(x)
    print(pred)
    # print(model.predict_proba(x))
    return round(pred[0][0] * 100, 3)


def RF_Predict(x):
    sc1 = load('std_scaler_rf.bin')
    x = sc1.transform(x)
    model=pickle.load(open('rf_model.pkl','rb'))
    # print(model)
    per=model.predict(x)
    # print(per)
    return round(per[0] * 100, 2)
