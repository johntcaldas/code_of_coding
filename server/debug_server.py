"""
The main execution entry-point for the webapp/services.
NOTE: When deployed (tested w/Apache+mode_wsgi) this file is not executed. For now, meaningful changes made here will
need equivalent changes in coc_server.wsgi, so that they are reflected when deployed behind a web server (eg. apache).
"""

from code_of_coding import app, app_setup

app_setup.setup_application()

if __name__ == "__main__":
    app.run(debug=True, threaded=True)

