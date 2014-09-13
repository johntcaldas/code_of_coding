from flask import request
import dateutil.parser

from code_of_coding import app
from code_of_coding.services.blog_posts_service import BlogPostsService
from code_of_coding.services import client_logger
from interface_utils import jsonify


@app.route("/posts/", methods=['GET'])
def get_posts():

    blog_posts_service = BlogPostsService()
    posts = blog_posts_service.get_posts()

    ret = {
        "success": "true",
        "posts": posts
    }

    return jsonify(ret)


@app.route("/posts/", methods=['POST'])
def add_post():
    post_data = request.form
    title = post_data['title']
    html = post_data['html']
    tags = post_data['tags']
    iso_date_string = post_data['date']
    date_object = dateutil.parser.parse(iso_date_string)

    blog_posts_service = BlogPostsService()
    post_id = blog_posts_service.add_post(title, html, tags, date_object)

    ret = {
        "success": "true",
        "post_id": post_id
    }

    return jsonify(ret)


@app.route("/log_client_message/", methods=['POST'])
def log_client_message():

    log_message = request.form

    message = log_message['message']
    level = log_message['level']
    url = log_message['url']

    client_logger.log(message, level, url)

    return jsonify({"success": "true"})