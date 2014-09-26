from flask import Flask
app = Flask(__name__)

import code_of_coding.interface.endpoints
import code_of_coding.interface.request_lifecycle