"""
The main execution entry-point for the webapp/services.
"""

# Import system stuff
from flask import make_response
from pymongo import MongoClient
import logging

# Import our stuff
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
    response.headers['Access-Control-Allow-Headers'] = "X-AuthToken"
    return response

if __name__ == "__main__":
    # Load the application configuration from file.
    app.config.from_pyfile("server.cfg", silent=True)

    # Configure logging
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    file_handler = logging.FileHandler(filename=app.config['SERVER_LOG_FILE'])
    file_handler.setFormatter(formatter)
    file_handler.setLevel(logging.DEBUG)
    app.logger.addHandler(file_handler)

    app.run(debug=True)
