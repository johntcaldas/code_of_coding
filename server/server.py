"""
The main execution entry-point for the webapp/services.
NOTE: When deployed (tested w/Apache+mode_wsgi) this file is not executed.
"""

# Import system stuff
import logging

# Import our stuff
from code_of_coding import app


# Application setup
# Load the application configuration from file.
app.config.from_pyfile("server.cfg", silent=True)

# Configure logging
formatter = logging.Formatter('%(asctime)s %(pathname)s:%(lineno)d %(levelname)s - %(message)s')
file_handler = logging.FileHandler(filename=app.config['SERVER_LOG_FILE'])
file_handler.setFormatter(formatter)
file_handler.setLevel(logging.DEBUG)
app.logger.setLevel(logging.DEBUG)
app.logger.addHandler(file_handler)

if __name__ == "__main__":
    app.run(debug=True)

