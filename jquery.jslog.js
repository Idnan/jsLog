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

        vc : '.jslogviewer',

        init: function (options, elem) {

            this.options = $.extend( {}, $.jsLog.options, options );

            // Start the processing
            this.bindUI();
            this.initViewer();
        },

        bindUI: function () {

            this.takeOverConsole();
            this.interceptLog();
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
            this.el = $("<p>"+log+"</p>");

            if (type == 'error') {
                this.el.css({'color': 'rgb(131, 255, 133)'});
            }

            $(this.el).hide().appendTo(this.vc).fadeIn('slow');


            this.scrollToBottom();
        },

        scrollToBottom : function() {
            $(this.vc).scrollTop($(this.vc).prop('scrollHeight'));
        },

        initViewer : function() {
            this.viewerEl = $("<div class='jslogviewer'></div>");
            this.viewerEl.css({
                'width': this.options.width,
                'height': this.options.height,
                'background': this.options.background,
                'top': this.options.top,
                'right': this.options.right
            });
            $(this.viewerEl).appendTo('body');
        },

        clearViewer : function() {
            this.viewerEl.empty();
        },

        hideViewer : function() {
            this.viewerEl.fadeOut('slow');
        },

        showViewer : function() {
            this.viewerEl.fadeIn('slow');
        }
    };

    $.jsLog = function(options) {
        var jsLog = Object.create( JSLog );
        jsLog.init(options, this);

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

    $.jsLog.options = {
        'width': '490px',
        'height': '200px',
        'background': 'rgba(0, 0, 0, 0.5)',
        'top': '5px',
        'right': '5px'
    };

})( jQuery, window, document );