from flask import request
import dateutil.parser

from code_of_coding import app
from code_of_coding.services.blog_posts_service import BlogPostsService
from code_of_coding.services import client_logging_service
from code_of_coding.services import authentication_service
from jsonify import jsonify
from interface_utils import auth
from error_handling import COCException


@app.route("/authenticate/", methods=['POST'])
def authenticate():
    post_data = request.get_json()
    app.logger.info("authenticate() - {0}".format(post_data))

    username = post_data['username']
    password = post_data['password']
    session = authentication_service.authenticate(username, password)

    if session is None:
        raise COCException("Failed to authenticate.")
    else:
        ret = {
            "success": True,
            "token": session['token'],
            "expires": session['expires']
        }

    return jsonify(ret)


@app.route("/posts/", methods=['GET'])
def get_posts():
    app.logger.info("get_posts()")

    blog_posts_service = BlogPostsService()
    posts = blog_posts_service.get_posts()

    ret = {
        "success": True,
        "posts": posts
    }

    return jsonify(ret)


@app.route("/posts/", methods=['POST'])
@auth
def add_post():
    post_data = request.get_json()
    app.logger.info("add_post() - {0}".format(post_data))

    title = post_data['title']
    html = post_data['html']
    tags = post_data['tags']
    iso_date_string = post_data['date']
    date_object = dateutil.parser.parse(iso_date_string)

    blog_posts_service = BlogPostsService()
    post_id = blog_posts_service.add_post(title, html, tags, date_object)

    ret = {
        "success": True,
        "post_id": post_id
    }

    return jsonify(ret)


@app.route("/posts/", methods=['PUT'])
@auth
def update_post():
    post_data = request.get_json()
    app.logger.info("update_post() - {0}".format(post_data))

    post_id = post_data['_id']
    title = post_data['title']
    html = post_data['html']
    tags = post_data['tags']
    iso_date_string = post_data['date']
    date_object = dateutil.parser.parse(iso_date_string)

    blog_posts_service = BlogPostsService()
    post_id = blog_posts_service.update_post(post_id, title, html, tags, date_object)

    ret = {
        "success": True,
        "post_id": post_id
    }

    return jsonify(ret)


@app.route("/log_client_message/", methods=['POST'])
def log_client_message():

    log_message = request.get_json()
    message = log_message['message']
    level = log_message['level']
    client_logging_service.log(message, level)

    return jsonify({"success": True})