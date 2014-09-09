from flask import jsonify, request

from code_of_coding import app
from code_of_coding.services.blog_posts_service import BlogPostsService
from code_of_coding.services import client_logger

@app.route("/posts/", methods=['GET'])
def get_posts():

    blog_posts_service = BlogPostsService()
    posts = blog_posts_service.get_posts()
    return jsonify(posts)

@app.route("/posts/", methods=['POST'])
def add_post():
    post_data = request.form
    html = post_data['html']
    tags = post_data['tags']
    author = post_data['author']
    blog_posts_service = BlogPostsService()
    post_id = blog_posts_service.add_post(html, tags, author)
    return jsonify({"post_id": post_id})

@app.route("/log_client_message/", methods=['POST'])
def log_client_message():

    log_message = request.form

    message = log_message['message']
    level = log_message['level']
    url = log_message['url']

    client_logger.log(message, level, url)

    return jsonify({"success": "true"})