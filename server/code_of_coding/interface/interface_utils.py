from functools import wraps
from flask import request, Response

from code_of_coding.services import authentication_service


def auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('X-AuthToken')
        if not authentication_service.validate_session(token):
            return Response('Authentication required.', 401, {'WWWAuthenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)
    return wrapper