import numpy as np
import pandas as pd
import seaborn as sns
import pickle
import matplotlib.pyplot as plt
import matplotlib as mpl
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from .models import LRModel

sns.set_style('dark')
dataset = pd.read_csv('hair_fall_dataset.csv')
# print(dataset.head())

(unique, counts) = np.unique(dataset['Label'], return_counts=True)

# print('Unique values of the target variable', unique)
# print('Counts of the target variable :', counts)

# sns.barplot(x=unique, y=counts)
# plt.title('Target variable counts in dataset')
# plt.show()

X = dataset.drop('Label', axis=1)
Y = dataset['Label']

# print(X, Y)

standardizer = StandardScaler()
X = standardizer.fit_transform(X)
# print(X)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)
# print(X_train,X_test,Y_train,Y_test)

model = LogisticRegression()
model.fit(X_train, Y_train)

mdl_data = pickle.dumps(model)
LRModel.objects.create(model=mdl_data)

raw_model = LRModel.objects.all()[0]
model = pickle.loads(raw_model.model)
predictions = model.predict_proba(X_test)
for x in predictions:
    print(x*100)

predictions = model.predict(X_test)
print(predictions)

cm = confusion_matrix(Y_test, predictions)

TN, FP, FN, TP = confusion_matrix(Y_test, predictions).ravel()

print('True Positive(TP)  = ', TP)
print('False Positive(FP) = ', FP)
print('True Negative(TN)  = ', TN)
print('False Negative(FN) = ', FN)

accuracy = (TP + TN) / (TP + FP + TN + FN)

print('Accuracy of the binary classification = {:0.3f}'.format(accuracy))
