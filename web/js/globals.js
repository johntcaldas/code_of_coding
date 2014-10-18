"use strict";

(function () {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    window.COC = {
        router: {},
        views: {},
        models: {},
        data: {},
        util: {},
        server_url_root: 'http://127.0.0.1:5000',
        url_root: location.protocol + "//" + location.host,
        session_token: null
    };

    // UUID Generator taken from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    COC.util.uuid = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    };

    // Create a moment.js date object from an ISO8601 string.
    COC.util.moment_date_from_iso_string = function(iso_string) {

        var moment_date = moment(iso_string, moment.ISO_8601);

        if(!moment_date.isValid()) {
            COC.log.error("moment_date_from_iso_string() unable to parse iso string: " + iso_string);
        }

        return moment_date;
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
