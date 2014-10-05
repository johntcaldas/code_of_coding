# Authentication

from datetime import datetime, timedelta
import uuid
import hashlib

from code_of_coding.data import database
from code_of_coding import app


def authenticate(username, password):

    # Get user.
    db = database.get_db()
    users = db.users
    user = users.find_one({"username": username})

    if user is None:
        return None

    # Check password
    hashed_password = user['password']
    if not _check_password(hashed_password, password):
        return None


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
    users.update({"_id": user['_id']}, user)

    # Return token and expire date.
    return session


def validate_session(token):
    db = database.get_db()
    users = db.users
    user = users.find_one({"session.token": token})

    if user is None:
        return False

    expires = user['session']['expires']
    if expires < datetime.utcnow():
        return False

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
