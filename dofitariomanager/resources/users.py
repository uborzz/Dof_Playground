# coding=utf-8

import logging
import datetime
from dofitariomanager import flaskmongo
from flask_restful import Resource
from flask import jsonify
from flask import request
from flask import abort

import requests
logger_ = logging.getLogger(__name__)


class Users(Resource):
    def get(self):
        print "POLLA"
        counter = 0
        userList = list()
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find()
        for line in cursor:
            userList.append(line['nick'])
        return jsonify({"users": userList})


class Week(Resource):
    def get(self, user):
        counter = 0
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find({"nick":user})
        for doc in cursor:
            counter = counter+1
            result = doc['week']
            print result
        if counter == 0:
            return json.dumps({"response":"Error", "desc": "User not registered"})
        else:
            return jsonify({"week": result})

    def put(self, user):
        json = request.json
        week = json['week']
        counter = 0
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find({"nick":user})
        for doc in cursor:
            counter = counter+1
            result = doc['week']
        print "MANTECA"
        # flaskmongo.db.tIndividualWeeklyTimetable.insert_one({"nick":user)
        if counter == 1:
            flaskmongo.db.tIndividualWeeklyTimetable.update_one(
                {"nick":user},
                {
                    "$set": {
                        "week": week
                    }
                }
            )
            return jsonify({"desc": "User week updated"})
        else:
            print week, type(week)
            flaskmongo.db.tIndividualWeeklyTimetable.insert_one(
                {"nick":user,
                "week":week}
            )
            return jsonify({"desc": "New user registered"})

    def delete(self, user):
        flaskmongo.db.tIndividualWeeklyTimetable.delete_one({"nick":user})
        return jsonify({"desc": "Element deleted"})
