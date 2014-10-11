"""
Error handling modeled after http://flask.pocoo.org/docs/0.10/patterns/apierrors/
While 'message' is used for logging purposes, 'user_message' is returned over the wire. This gives us the ability
to have server-side generated user-friendly messages while logging technical details. Each error returned to the
caller will arrive with an associated guid, which can be used to pinpoint the exception details in the log.
"""
from jsonify import jsonify
import uuid

from code_of_coding import app


class COCException(Exception):

    def __init__(self, message, user_message="There was an error on the server."):
        Exception.__init__(self)
        self.message = message
        self.user_message = user_message
        self.guid = uuid.uuid4()

    def to_dict(self):
        dict = {
            "success": False,
            "message": self.user_message,
            "error_guid": self.guid
        }
        return dict


@app.errorhandler(Exception)
def handle_coc_exception(error):
    # Log our own exceptions at error level (no need for stack trace, these are "expected"
    if isinstance(error, COCException):
        app.logger.error("COCException guid={0} msg={1} user_msg={2}".format(
            error.guid, error.message, error.user_message))
        response = jsonify(error.to_dict())
    else:
        app.logger.exception(error)
        response = jsonify({
            "success": False,
            "message": "There was an error on the server."
        })

    return response