"""
Content Service

"""
from datetime import datetime

from code_of_coding import app
from code_of_coding.data import database


class ContentService():

    def __init__(self):
        db = database.get_db()
        self.content = db.content

    def get_content_list(self):
        content_list_cursor = self.content.find()
        content_list = list(content_list_cursor)
        return content_list

    def get_content(self, content_id):
        content = self.content.find_one({"content_id": content_id})
        return content

    def update_content(self, content_id, html):
        write_result = self.content.update({"content_id": content_id}, {
            "content_id": content_id,
            "html": html,
            "date": datetime.utcnow()
        })
        app.logger.debug("Updated content with id={0} and write_result={1}".format(content_id, write_result))

        return write_result["n"] == 1



