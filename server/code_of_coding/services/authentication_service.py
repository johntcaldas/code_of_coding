# Authentication

from datetime import datetime, timedelta
import uuid
import hashlib

from code_of_coding import app
from code_of_coding.data import database
from code_of_coding.interface.error_handling import COCException


def authenticate(username, password):

    # Get user.
    db = database.get_db()
    users = db.users
    user = users.find_one({"username": username})

    if user is None:
        raise COCException("Could not find user {0}".format(username))

    # Check password
    hashed_password = user['password']
    if not _check_password(hashed_password, password):
        raise COCException("Password validation failed for user {0}".format(username))


    # Remove any existing sessions
    user['session'] = None

    # Create new session
    now = datetime.utcnow()
    session_minutes = app.config['SESSION_MINUTES']
    expires = now + timedelta(minutes=session_minutes)

    session = {
        "token": uuid.uuid4().hex,
        "expires": expires
    }

    # Store the session with the user
    user['session'] = session
    write_result = users.update({"_id": user['_id']}, user)
    app.logger.debug("Updated user with session. write_result={0}".format(write_result))

    # Return token and expire date.
    return session


def validate_session(token):
    db = database.get_db()
    users = db.users
    user = users.find_one({"session.token": token})

    if user is None:
        raise COCException("Could not find session for token {0}".format(token))

    expires = user['session']['expires']
    if expires < datetime.utcnow():
        raise COCException("Found expired session for token={0} expired={1}".format(token, expires))

    return True


# Helpers
# Code for hashing and checking taken from: http://www.pythoncentral.io/hashing-strings-with-python/
def _hash_password(password):
    # uuid is used to generate a random number
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def _check_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()
