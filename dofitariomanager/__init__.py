from flask import Flask, url_for, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_restful import Api


flaskapp = Flask(__name__, static_url_path='', static_folder='../static/')
flaskapp.config.from_object('config') #here I load the parameters in config.py

cors = CORS(flaskapp, resources={r"/api/*": {"origins": "*"}})
flaskmongo = PyMongo(flaskapp)
flaskapi = Api(flaskapp)
