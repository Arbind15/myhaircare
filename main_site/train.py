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
from .predict import LR_predict_manual
from keras.models import Sequential
from keras.layers import Dense
from keras.backend import clear_session
from joblib import dump, load
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score


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


def ANN_Train_Manual():
    dataset = pd.DataFrame.from_records(SurveyData.objects.all().values())
    x = dataset.drop('Label', axis=1).drop('id', axis=1)
    y = dataset['Label']
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)
    sc = StandardScaler()
    x_train = sc.fit_transform(x_train)
    x_test = sc.transform(x_test)

    dump(sc, 'std_scaler.bin', compress=True)

    clear_session()

    model = Sequential()
    model.add(Dense(30, input_dim=22, activation="relu"))
    model.add(Dense(30, activation="relu"))
    model.add(Dense(35, activation="relu"))
    model.add(Dense(40, activation="relu"))
    model.add(Dense(45, activation="relu"))
    model.add(Dense(50, activation="relu"))
    model.add(Dense(55, activation="relu"))
    model.add(Dense(60, activation="relu"))
    model.add(Dense(60, activation="relu"))
    model.add(Dense(60, activation="relu"))
    model.add(Dense(30, activation="relu"))
    model.add(Dense(25, activation="relu"))
    model.add(Dense(20, activation="relu"))
    model.add(Dense(15, activation="relu"))
    model.add(Dense(10, activation="relu"))
    model.add(Dense(5, activation="relu"))
    model.add(Dense(1, activation="sigmoid"))
    model.compile(loss="binary_crossentropy", optimizer="adam", metrics=["accuracy"])
    model.fit(x_train, y_train, epochs=500, batch_size=5)
    _, accuracy = model.evaluate(x_test, y_test)
    # mdl_data = pickle.dumps(model)
    # tmp_mdl = ANN_Model.objects.all()
    # if len(tmp_mdl) <= 0:
    #     ANN_Model.objects.create(model=mdl_data)
    # else:
    #     tmp_mdl[0].model = mdl_data
    #     tmp_mdl[0].save()
    model.save('ann_model.h5')

    return round(accuracy*100,2)

def RF_Train_manual():
    data = pd.DataFrame.from_records(SurveyData.objects.all().values())
    X = data.drop(["Label"], axis=1).drop('id', axis=1).values
    y = data["Label"].values
    np.random.seed(50)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)
    dump(sc, 'std_scaler_rf.bin', compress=True)
    clf = RandomForestClassifier()
    clf.fit(X_train, y_train)
    y_preds = clf.predict(X_test)
    accuracy=accuracy_score(y_test, y_preds)
    # print(accuracy)

    pickle.dump(clf,open('rf_model.pkl','wb'))

    return round(accuracy*100,2)