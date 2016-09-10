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


def make_error(status_code, message):
    response = jsonify({
        'status': status_code,
        'message': message
    })
    response.status_code = status_code
    return response



class GeneralWeek(Resource):

    # def __init__(self, session=None):
    #     if session is None:
    #         session = db.get_session()
    #     self._session = session
    def get(self):
        aux = numpy.asarray([[0] * 16] * 7)
        counter = 0
        cursor = flaskmongo.db.tIndividualWeeklyTimetable.find()
        for line in cursor:
            counter = counter + 1
            aux = aux + numpy.array(line['week'])
        result = numpy.ndarray.tolist(aux)

        if counter == 0:
            return make_error(404, "No results o_O, check DB!!!")
        else:
            return {"week": result}
