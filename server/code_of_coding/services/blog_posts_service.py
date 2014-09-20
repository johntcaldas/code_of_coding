"""
Blog Posts Service

"""
import pymongo
from pymongo import MongoClient
import datetime

from code_of_coding.data import database


class BlogPostsService():

    def __init__(self):
        db = database.get_db()
        self.posts = db.posts

    def get_posts(self):
        posts_cursor = self.posts.find().sort("date", pymongo.DESCENDING)
        posts_list = list(posts_cursor)
        return posts_list

    def add_post(self, title, html, tags, date=datetime.datetime.utcnow()):
        post = {
            "title": title,
            "html": html,
            "tags": tags,
            "date": date
        }
        blog_post_id = self.posts.insert(post)
        return blog_post_id

    def update_post(self, post_id, html, tags, date):
        self.posts.update({"_id": post_id}, {
            "html": html,
            "tags": tags,
            "date": date
        })


