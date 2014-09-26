from flask import make_response

from code_of_coding import app

@app.before_request
def before_request_callback():
    app.logger.info("Before request!!!")
    pass


@app.teardown_request
def teardown_request(exception):
    """Request teardown handlers, which are called when every request is completed"""
    pass


@app.after_request
def after_request_callback(response):
    response = make_response(response)
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Access-Control-Allow-Headers'] = "X-AuthToken"
    return response