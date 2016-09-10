# coding=utf-8
import logging
import datetime
from dofitariomanager import flaskmongo, flaskapp
from flask_restful import Resource,  fields, marshal_with, reqparse
from flask import jsonify
from flask import request
from flask import abort
import requests
logger_ = logging.getLogger(__name__)

# resource_fields = {
#     'week': fields.List(fields.List(fields.Integer))
# }

parser = reqparse.RequestParser()
parser.add_argument('nick', type=str, required=True)
parser.add_argument('week', type=list, action="append", required=True)


parser_name = reqparse.RequestParser()
parser_name.add_argument('nick', type=str, required=True)

def make_error(status_code, message):
    response = jsonify({
        'status': status_code,
        'message': message
    })
    response.status_code = status_code
    return response



class Users(Resource):
    def get(self):
        counter = 0
        userList = list()
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find()
        for line in cursor:
            userList.append(line['nick'])
        return jsonify({"users": userList})

    def post(self):
        args = parser_name.parse_args()
        user = args['nick']
        week = [[0] * 16] * 7
        try:
            flaskmongo.db.tIndividualWeeklyTimetable.insert_one({"nick":user, "week": week})
            return jsonify({"desc": "New user registered"})
        except:
            return make_error(404,'user already exists')



class Week(Resource):
    # @marshal_with(resource_fields)
    def get(self, user):
        try:
            cursor = flaskmongo.db.tIndividualWeeklyTimetable.find_one_or_404({"nick":user})
            return {"week": cursor['week']}
        except:
            return make_error(404,'user does not exists')

    def put(self, user):
        args = parser.parse_args()
        week = args['week']
        try:
            cursor = flaskmongo.db.tIndividualWeeklyTimetable.find_one_or_404({"nick":user})
            result = cursor['week']
            flaskmongo.db.tIndividualWeeklyTimetable.update_one(
                {"nick":user},
                {
                    "$set": {
                        "week": week
                    }
                }
            )
            return jsonify({"desc": "User week updated"})
        except:
            return make_error(404,'user does not exists')

    def delete(self, user):
        flaskmongo.db.tIndividualWeeklyTimetable.delete_one({"nick":user})
        return jsonify({"desc": "Element deleted"})
