from pymongo import MongoClient


class Data():
    def __init__(self):
        self.mongo_client = MongoClient('localhost', 27017)
        pass

