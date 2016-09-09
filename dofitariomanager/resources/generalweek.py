# coding=utf-8

import logging
import datetime
from dofitariomanager import flaskmongo
import numpy
from flask_restful import Resource
from flask import jsonify
from flask import request
from flask import abort




logger_ = logging.getLogger(__name__)


class GeneralWeek(Resource):

    # def __init__(self, session=None):
    #     if session is None:
    #         session = db.get_session()
    #     self._session = session


    def get(self):
        print "POLLA"
        counter = 0
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find()
        for line in cursor:
            print line['week']
            counter = counter + 1
            if counter == 1:
                aux = numpy.array(line['week'])
            else:
                aux = aux + numpy.array(line['week'])

        print aux
        result = numpy.ndarray.tolist(aux)
        print result

        if counter == 0:
            return json.dumps({"response":"Error", "desc": "No results o_O, check DB!!!"})
        else:
            return jsonify({"week": result})
