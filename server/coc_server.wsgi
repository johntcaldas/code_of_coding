CODE_OF_CODING = "path/to/code_of_coding/server"

import sys
sys.path.insert(0, CODE_OF_CODING)
from code_of_coding import app as application
from code_of_coding import app_setup
app_setup.setup_application()