import pyrebase
import json 

f = open('muthu.json') 
data = json.load(f) 

config = {
    "apiKey": "AIzaSyCQIiU0SjHxW7CJ0P90r6kwoI1jH8XPpHc",
    "authDomain": "sentimental-recommendation-sys.firebaseapp.com",
    "databaseURL": "https://sentimental-recommendation-sys.firebaseio.com",
    "projectId": "sentimental-recommendation-sys",
    "storageBucket": "sentimental-recommendation-sys.appspot.com",
    "messagingSenderId": "128274881368",
    "appId": "1:128274881368:web:474e180f7ad1bdc160632d",
    "measurementId": "G-2Z09GBGB7J"
}

firebase = pyrebase.initialize_app(config)
db=firebase.database()

for i in data:
    db.child("products").child(i["uniq_id"]).child("bought").set(False)
    db.child("products").child(i["uniq_id"]).child("rating").set(0)



