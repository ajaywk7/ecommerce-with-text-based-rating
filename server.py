from flask import Flask , jsonify ,request
from flask_cors import CORS,cross_origin
import pickle
import pyrebase
import json
import numpy as np
import pandas as ps
from textblob import TextBlob
import fire

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


app = Flask(__name__)
CORS(app)


@app.route('/',methods=['POST'])
@cross_origin()
def getall():
    data = request.json
    search=data['search']
    products_data = db.child("products").get()
    result = []  
    for product in products_data.each():
        if search.lower() in product.val()["product_name"].lower():
            result.append(product.val())
    result = sorted(result, key = lambda i: i['rating'],reverse=True)
    return jsonify({
        "result":result
    })

@app.route('/getone',methods=['POST'])
@cross_origin()
def getone():
    data = request.json
    id=data['id']
    result = db.child("products").child(id).get().val()
    return jsonify({
        "result":result
    })

@app.route('/buy',methods=['POST'])
@cross_origin()
def buy():
    data = request.json
    id =data['id']
    print(id)
    db.child("products").child(id).child("bought").set(True)
    return jsonify({
        "result":"success"
    })

@app.route('/comment',methods=['POST'])
@cross_origin()
def addcomment():
    data = request.json
    id =data['id']
    text = data['comment']
    count = db.child("products").child(id).child("rating").get().val()
    obj=TextBlob(text)
    sentiment=obj.sentiment.polarity
    if sentiment<0:
        count = count-1
        print("Negative")
    else:
        count = count+1
        print("Positive")
    #db.child("products").child(id).child("").set(True)
    count = db.child("products").child(id).child("rating").set(count)
    return jsonify({
        "result":"success"
    })

if(__name__ == "__main__"):
    app.run(debug=True)
