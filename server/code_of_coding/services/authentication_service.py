# Authentication


import uuid
import hashlib


def authenticate(username, password):
    hashed_password = _hash_password(password)


    

# Helpers
# Code for hashing and checking taken from: http://www.pythoncentral.io/hashing-strings-with-python/
def _hash_password(password):
    # uuid is used to generate a random number
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt

def _check_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()
