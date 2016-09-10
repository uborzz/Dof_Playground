from flask import Flask, url_for, request, json
from dofitariomanager import flaskapp, flaskmongo, flaskapi
from dofitariomanager.resources import generalweek, users


@flaskapp.route('/')
def root():
    return flaskapp.send_static_file('index.html')

flaskapi.add_resource(users.Week, '/api/users/<user>/week')
flaskapi.add_resource(generalweek.GeneralWeek, '/api/general/week')
flaskapi.add_resource(users.Users, '/api/users')

if __name__ == '__main__':
    flaskapp.run(host= '0.0.0.0', port=80)
