from flask import Flask, url_for, request, json
from pymongo import MongoClient
import numpy

client = MongoClient()
db = client.dofidb

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/users/<user>/week', methods = ['GET','PUT'])
def api_userWeek(user):
    if request.method == 'GET':
        counter = 0
        cursor = db.tIndividualWeeklyTimetable.find({"nick":user})
        for doc in cursor:
            counter = counter+1
            result = doc['week']
            print result
        if counter == 0:
            return json.dumps({"response":"Error", "desc": "User not registered"})
        else:
            return json.dumps({"response":"OK", "week": result})
    else:
        week = json.loads(request.data)['week']
        print week, type(week)
        counter = 0
        cursor = db.tIndividualWeeklyTimetable.find({"nick":user})
        for doc in cursor:
            counter = counter+1
            result = doc['week']
        # db.tIndividualWeeklyTimetable.insert_one({"nick":user)
        if counter == 1:
            db.tIndividualWeeklyTimetable.update_one(
                {"nick":user},
                {
                    "$set": {
                        "week": week
                    }
                }
            )
            return json.dumps({"response":"OK", "desc": "User week updated"})
        else:
            db.tIndividualWeeklyTimetable.put_one(
                {"nick":user},
                {"week": json.loads(request.data)}
            )
            return json.dumps({"response":"OK", "desc": "New user registered"})

@app.route('/api/general/week', methods = ['GET'])
def api_genWeek():
    if request.method == 'GET':

        counter = 0
        cursor = db.tIndividualWeeklyTimetable.find()
        for line in cursor:
            counter = counter + 1
            if counter == 1:
                aux = numpy.array(line['week'])
            else:
                aux + numpy.array(line['week'])

        c = numpy.ndarray.tolist(a + b)

        if counter == 0:
            return json.dumps({"response":"Error", "desc": "User not registered"})
        else:
            return json.dumps({"response":"OK", "week": result})
    else:
        return json.dumps({"response":"Error", "desc": "Method not supported"})


@app.route('/articles')
def api_articles():
    return 'List of ' + url_for('api_articles')


@app.route('/articles/<articleid>')
def api_article(articleid):
    return 'You are reading ' + articleid

@app.route('/hello')
def api_hello():
    if 'name' in request.args:
        return 'Hello ' + request.args['name']
    else:
        return 'Hello John Doe'

@app.route('/echo', methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'])
def api_echo():
    if request.method == 'GET':
        return "ECHO: GET\n"

    elif request.method == 'POST':
        return "ECHO: POST\n"

    elif request.method == 'PATCH':
        return "ECHO: PACTH\n"

    elif request.method == 'PUT':
        return "ECHO: PUT\n"

    elif request.method == 'DELETE':
        return "ECHO: DELETE"


if __name__ == '__main__':
    app.run(port=8080)
