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



class User(Resource):
    def delete(self, user):
        try:
            flaskmongo.db.tIndividualWeeklyTimetable.delete_one({"nick":user})
            return {"message": "Element deleted"}
        except:
            return make_error(404,'user does not exists')


class Users(Resource):
    def get(self):
        userList = list()
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find()
        for line in cursor:
            userList.append(line['nick'])
        return {"users": userList}

    def post(self):
        try:
            args = parser_name.parse_args()
            user = args['nick']
            week = [[0] * 16] * 7
            counter = 0
            cursor = flaskmongo.db.tIndividualWeeklyTimetable.find({"nick":user})

            for doc in cursor:
                counter = counter+1

            if counter == 0:
                flaskmongo.db.tIndividualWeeklyTimetable.insert_one({"nick":user, "week": week})
                result = flaskmongo.db.tIndividualWeeklyTimetable.find_one_or_404({"nick":user})
                return {"week" : result['week'], "nick" : result['nick']}

            else:
                return make_error(404,'user already exists')

        except:
            return make_error(500,'error')



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
            flaskmongo.db.tIndividualWeeklyTimetable.update_one({ "nick":user },
            { "$set": { "week": week} } )
            return {"week": week}
        except:
            return make_error(404,'user does not exists')
