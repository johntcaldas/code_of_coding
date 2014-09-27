"use strict";

(function () {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    window.COC = {
        router: {},
        views: {},
        models: {},
        util: {},
        server_url_root: 'http://127.0.0.1:5000',
        session_token: null
    };


    //************************************************
    // Log to server                                 *
    //************************************************
    // Create custom JSON Appender
    function json_appender(url) {
        var is_supported = true;
        var success_callback = function (data, textStatus, jqXHR) {
            return;
        };
        if (!url) {
            is_supported = false;
        }
        this.set_success_callback = function (success_callback) {
            success_callback = success_callback;
        };
        this.append = function (logging_event) {
            if (!is_supported) {
                return;
            }

            var data = JSON.stringify({
                'logger': logging_event.logger.name,
                'timestamp': logging_event.timeStampInMilliseconds,
                'level': logging_event.level.name,
                'url': window.location.href,
                'message': logging_event.getCombinedMessages(),
                'exception': logging_event.getThrowableStrRep()
            });
            $.ajax({
                contentType: 'application/json',
                url: url,
                data: data,
                type: "POST",
                dataType: "json",
                success: success_callback,
                error: function() {
                    alert('error logging')
                }
            });
        };
    }

    json_appender.prototype = new log4javascript.Appender();
    json_appender.prototype.toString = function () {
        return 'json_appender';
    };
    log4javascript.json_appender = json_appender;

    // Set up logger
    COC.log = log4javascript.getLogger();
    var json_appender = new json_appender(COC.server_url_root + "/log_client_message/");
    COC.log.addAppender(json_appender);
    COC.log.debug("globals.js: Loaded logger.");

})();
