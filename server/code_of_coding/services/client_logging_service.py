import logging

from code_of_coding import app


def log(message, level, url):

    pass
    client_logger = logging.getLogger("client_logger")

    # Only add a file handler if it isn't already there. (ie. on the first call to this method)
    if len(client_logger.handlers) < 1:
        client_logger.setLevel(logging.DEBUG)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        file_handler = logging.FileHandler(filename=app.config['CLIENT_LOG_FILE'])
        file_handler.setFormatter(formatter)
        client_logger.addHandler(file_handler)

    message = "{0} - {1}".format(url, message)

    if level in ["ALL", "TRACE", "DEBUG"]:
        client_logger.debug(message)
    elif level in ["INFO", "WARN"]:
        client_logger.info(message)
    elif level in ["ERROR", "FATAL"]:
        client_logger.error(message)
    elif level in ["OFF"]:
        # Don't log?
        pass
    else:
        client_logger.error(message)
