from functools import wraps, update_wrapper
from flask import request, Response, make_response, current_app
from datetime import timedelta
from jsonify import jsonify

from code_of_coding import app
from code_of_coding.services import authentication_service


####################
# Error Handling   #
####################
# Error handling modeled after http://flask.pocoo.org/docs/0.10/patterns/apierrors/
class COCException(Exception):
    status_code = 500

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@app.errorhandler(COCException)
def handle_coc_exception(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


####################
# Decorators       #
####################

def auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('X-AuthToken')
        if not authentication_service.validate_session(token):
            # TODO log method
            app.logger.info("auth() Auth failed for method")
            return Response('Authentication required.', 401, {'WWWAuthenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)

    return wrapper


def cross_domain(origin=None, methods=None, headers=None, max_age=21600, attach_to_all=True, automatic_options=True):
    """
    Endpoints decorated with cross_domain will be available as cross domain resources (CORS).
    See http://flask.pocoo.org/snippets/56/
    Example usage: @cross_domain(origin='*')
    """
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False

        return update_wrapper(wrapped_function, f)

    return decorator