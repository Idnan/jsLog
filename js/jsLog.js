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
            console.log = this.interceptLog;
        },

        interceptLog : function(log) {
            if(log) {
                JSLog.appendToViewer(JSON.stringify(log));
                console.original(log);
            }
        },

        appendToViewer : function(log) {
            this.el = "<p>"+log+"</p>";
            $(this.el).hide().appendTo('.jslogviewer').fadeIn('slow');
            this.scrollToBottom();
        },

        scrollToBottom : function() {
            $('.jslogviewer').scrollTop($('.jslogviewer').prop('scrollHeight'));
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
        }
    };

    $.jsLog = function(options) {
        var jsLog = Object.create( JSLog );
        jsLog.init(options, this);
    };

    $.jsLog.options = {
        width: '490px',
        height: '200px',
        background: 'rgba(0, 0, 0, 0.5)',
        top: '5px',
        right: '5px'
    };

})( jQuery, window, document );