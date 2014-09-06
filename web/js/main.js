// Right now there are 3 js files that load themselves: globals.js, router.js, and main.js (this file).

$(document).ready(function() {

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
    //var ajaxAppender = new log4javascript.AjaxAppender(window.COC.serverUrlRoot + "/log_client_message/");
    //ajaxAppender.setLayout(new log4javascript.JsonLayout());
    //ajaxAppender.addHeader("Content-Type", "application/json");
    var jsonAppender = new JsonAppender(window.COC.serverUrlRoot + "/log_client_message/");
    window.COC.log.addAppender(jsonAppender);

    window.COC.log.info("HelloWorld");

});
