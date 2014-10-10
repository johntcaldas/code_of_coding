import logging
from logging import handlers

from code_of_coding import app


def setup_application():
    # Load the application configuration from file.
    app.config.from_pyfile("server.cfg", silent=True)

    # Configure logging
    #logging.basicConfig(stream=sys.stderr)
    formatter = logging.Formatter('%(asctime)s %(module)s:%(lineno)d %(levelname)s - %(message)s')
    file_handler = handlers.RotatingFileHandler(filename=app.config['SERVER_LOG_FILE'], maxBytes=1024)
    file_handler.setFormatter(formatter)
    file_handler.setLevel(logging.DEBUG)
    app.logger.setLevel(logging.DEBUG)
    app.logger.addHandler(file_handler)