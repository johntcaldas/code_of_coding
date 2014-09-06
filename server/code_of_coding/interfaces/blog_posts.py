from flask import jsonify, request

from code_of_coding import app
from code_of_coding.services.blog_posts_service import BlogPostsService
from code_of_coding.services import client_logger

@app.route("/blog_posts/", methods=['GET'])
def summary():

    blog_posts_service = BlogPostsService()
    posts = blog_posts_service.get_blog_posts()
    return jsonify(posts)

@app.route("/log_client_message/", methods=['POST'])
def log_client_message():

    log_message = request.form

    message = log_message['message']
    level = log_message['level']
    url = log_message['url']

    client_logger.log(message, level, url)

    return jsonify({"result": "True"})