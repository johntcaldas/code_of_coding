from flask import jsonify

from code_of_coding import app
from code_of_coding.services.blog_posts_service import BlogPostsService

@app.route("/blog_posts/", methods=['GET'])
def summary():
    blog_posts_service = BlogPostsService()
    posts = blog_posts_service.get_blog_posts()
    return jsonify(posts)
