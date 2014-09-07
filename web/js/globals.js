"use strict";

(function () {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    var CodeOfCoding = window.COC = {
        router: {},
        views: {},
        models: {},
        serverUrlRoot: 'http://127.0.0.1:5000'
    }


    // Create custom JSON Appender
    function JsonAppender(url) {
        var isSupported = true;
        var successCallback = function(data, textStatus, jqXHR) { return; };
        if (!url) {
            isSupported = false;
        }
        this.setSuccessCallback = function(successCallbackParam) {
            successCallback = successCallbackParam;
        };
        this.append = function (loggingEvent) {
            if (!isSupported) {
                return;
            }
            $.post(url, {
                'logger': loggingEvent.logger.name,
                'timestamp': loggingEvent.timeStampInMilliseconds,
                'level': loggingEvent.level.name,
                'url': window.location.href,
                'message': loggingEvent.getCombinedMessages(),
                'exception': loggingEvent.getThrowableStrRep()
            }, successCallback, 'json');
        };
    }
    JsonAppender.prototype = new log4javascript.Appender();
    JsonAppender.prototype.toString = function() {
        return 'JsonAppender';
    };
    log4javascript.JsonAppender = JsonAppender;

    // Set up logger
    window.COC.log = log4javascript.getLogger();
    var jsonAppender = new JsonAppender(window.COC.serverUrlRoot + "/log_client_message/");
    window.COC.log.addAppender(jsonAppender);
    window.COC.log.debug("globals.js: Loaded logger.");

})();
