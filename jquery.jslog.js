;
// jslog plugin created by Adnan Ahmed
// v0.1
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function( $, window, document, undefined ) {
    "use strict";

    var JSLog = {

        init: function () {

            // Generate the custom console
            JSLog.generateConsole();
            // Take over the browser console
            JSLog.takeOverConsole();
        },

        takeOverConsole : function() {
            console.original = console.log;
            window.onerror = JSLog.interceptError;
            console.log = JSLog.interceptLog;
        },

        interceptError: function(msg, url, linenumber) {
            if (msg) {
                JSLog.appendToViewer(JSON.stringify(msg), 'error');
            }
        },

        interceptLog : function(log) {
            if(log) {
                JSLog.appendToViewer(JSON.stringify(log));
                console.original(log);
            }
        },

        appendToViewer : function(log, type) {
            JSLog.logEl = $("<p></p>", {
               text : log,
               class : ( type === 'error' ) ? 'clog-error' : 'clog-msg',
            });

            JSLog.consoleViewerEl.append( JSLog.logEl );
            $.proxy( JSLog.scrollToBottom, this);
        },

        scrollToBottom : function() {
            JSLog.consoleViewerEl.scrollTop( JSLog.consoleViewerEl.prop('scrollHeight') );
        },

        generateConsole : function() {

            JSLog.consoleViewerEl = $("<div></div>", {
                class : "clog-viewer"
            });

            $('body').append( JSLog.consoleViewerEl );
        },

        clearViewer : function() {
            JSLog.consoleViewerEl.empty();
        },

        hideViewer : function() {
            JSLog.consoleViewerEl.hide('slow');
        },

        showViewer : function() {
            JSLog.consoleViewerEl.show('slow');
        }
    };

    $.jsLog = function() {
        var jsLog = Object.create( JSLog );
        jsLog.init();

        return {
            clear : function() {
                jsLog.clearViewer();
            },
            hide : function() {
                jsLog.hideViewer();
            },
            show : function() {
                jsLog.showViewer();
            },

        }
    };

})( jQuery, window, document );