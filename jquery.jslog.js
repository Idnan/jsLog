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
            this.generateConsole();
            // Take over the browser console
            this.takeOverConsole();
        },

        takeOverConsole : function() {
            console.original = console.log;
            window.onerror = this.interceptError;
            console.log = this.interceptLog;
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
            this.logEl = $("<p></p>", {
               text : log,
               class : ( type === 'error' ) ? 'clog-error' : 'clog-msg',
               css : { 'color' : ( type === 'error' ) ? '#F00C0C' : '#000000' }
            });

            this.logEl.appendTo( this.consoleViewerEl );
            this.scrollToBottom();
        },

        scrollToBottom : function() {
            this.consoleViewerEl.scrollTop( this.consoleViewerEl.prop('scrollHeight') );
        },

        generateConsole : function() {

            this.consoleViewerEl = $("<div></div>", {
                class : "clog-viewer"
            });

            this.consoleViewerEl.appendTo('body');
        },

        clearViewer : function() {
            this.consoleViewerEl.empty();
        },

        hideViewer : function() {
            this.consoleViewerEl.hide('slow');
        },

        showViewer : function() {
            this.consoleViewerEl.show('slow');
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