from functools import wraps, update_wrapper
from flask import request, Response, make_response, current_app
from datetime import timedelta

from code_of_coding.services import authentication_service


def auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('X-AuthToken')
        if not authentication_service.validate_session(token):
            return Response('Authentication required.', 401, {'WWWAuthenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)
    return wrapper


def cross_domain(origin=None, methods=None, headers=None, max_age=21600, attach_to_all=True, automatic_options=True):
    """
    Endpoints decorated with cross_domain will be available as cross domain resources (CORS).
    See http://flask.pocoo.org/snippets/56/
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