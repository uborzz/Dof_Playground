from flask import Flask, url_for, request, json
from pymongo import MongoClient

client = MongoClient()
db = client.dofidb

app = Flask(__name__)

a = 0
cursor = db.tIndividualWeeklyTimetable.find({"nick":"Nimro"})
for doc in cursor:
    a = a+1
print a



cursor = db.tIndividualWeeklyTimetable.update_one(
    {"nick":"Niao"},
        {"$set": {
            "data":"dataaaa"
        },
    }
)
