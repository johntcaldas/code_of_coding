SERVER_CONFIGURATION_FILE = "/path/to/server.cfg"
CODE_OF_CODING = "path/to/code_of_coding/server"

import sys
sys.path.insert(0, CODE_OF_CODING)

from code_of_coding import app as application

import logging
logging.basicConfig(stream=sys.stderr)

# Load the application configuration from file.
application.config.from_pyfile(SERVER_CONFIGURATION_FILE, silent=True)
test = application.config['MONGO_HOST']
# Configure logging
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler = logging.FileHandler(filename=application.config['SERVER_LOG_FILE'])
file_handler.setFormatter(formatter)
file_handler.setLevel(logging.DEBUG)
application.logger.addHandler(file_handler)