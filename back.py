import json
import sqlite3

conn = sqlite3.connect('m2m.db')
cur = conn.cursor()

js = json.loads(open('roster_data.json').read())

