from flask import make_response, request

from code_of_coding import app

@app.before_request
def before_request_callback():
    pass


@app.teardown_request
def teardown_request(exception):
    """Request teardown handlers, which are called when every request is completed"""
    pass


@app.after_request
def after_request_callback(response):
    response = make_response(response)
    response.headers['Access-Control-Allow-Origin'] = "*"
    if 'Access-Control-Request-Headers' in request.headers:
        response.headers['Access-Control-Allow-Headers'] = request.headers['Access-Control-Request-Headers']
    response.headers['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS, PUT, DELETE"
    return response