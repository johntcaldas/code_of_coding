from pymongo import MongoClient
from flask import g

from code_of_coding import app


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = _connect_to_database()
    return db


def _connect_to_database():
    host = app.config['MONGO_HOST']
    port = app.config['MONGO_PORT']
    db_name = app.config['DATABASE_NAME']

    mongo_client = MongoClient(host, port)
    db = mongo_client[db_name]

    return db






