;
/*! Copyright (c) 2014 Adnan Ahmed (http://adnanahmed.info)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.0
 *
 */
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
            JSLog.generateConsole();
            JSLog.takeOverConsole();
        },

        takeOverConsole : function() {

            this.wrapper = document.querySelector(".console-scroll-container");
            this.div = document.querySelector(".console-rows");

            window.onerror = JSLog.interceptError;            
            if (!console) window.console = {};
            this._log = console.log;
            console.log = JSLog.interceptLog;
        },

        interceptError: function(msg, url, linenumber) {
            if (msg) {
                JSLog.appendToViewer(JSON.stringify(msg), 'error');
            }
        },

        interceptLog : function() {
            var args = arguments;
            this._log && this._log.apply(console, args);

            var log = '';
            if (typeof args[0] === "string" && args.length > 1 && /((^|[^%])%[sdifoO])/.test(args[0])) {
                log = format.apply(null, args);
            } else {
                log = [].map.call(args, JSLog.getString).join(" ");
            }            
            JSLog.appendToViewer(log, '');
        },

        isInstance : function(val, typeName) {
            return val instanceof window[typeName];
        },

        getString : function(val, wrapString) {
            if (typeof val === "string") {
                return wrapString ? '"' + val + '"' : val;
            } else if (val == null || typeof val === "number" || typeof val === "function" || this.isInstance(val, "Date")) {
                return "" + val;
            } else if (this.isInstance(val, "HTMLElement")) {
                return val.outerHTML;
            } else {
                try {
                    return JSON.stringify(val, function (k, v) {
                        if (this.isInstance(v, "HTMLElement")) {
                            return v.outerHTML;
                        } else if (typeof v === "function") {
                            return "" + v;
                        }
                        return v;
                    });
                } catch (err) {
                    return Object.prototype.toString.call(val);
                }
            }
        },

        format: function() {
            var i = 0,
                val,
                args = arguments;

            return args[0].replace(/(%?%[sdifoO])/g, function (c) {

                if (c.length === 3) return c;

                val = args[++i];

                if (val == null) {
                    return "" + val;
                }

                switch (c.charAt(1)) {
                    case "s":
                        return val;
                    case "d":
                    case "i":
                        return typeof val === "number" ? Math.floor(val) : "NaN";
                    case "f":
                        return typeof val === "number" ? val : "NaN";
                    default:
                        return this.getString(val, true);
                }
            });
        },

        appendToViewer : function(log, type) {
            
            var row = document.createElement("div");
            row.className = "console-row";

            var code = row.appendChild(document.createElement("code"));
            code.className = ( type === 'error' ) ? 'console-row-code console-row-code-error' : 'console-row-code';
            code.textContent = log;

            JSLog.div.appendChild(row);
            JSLog.wrapper.scrollTop = row.offsetTop;
        },

        scrollToBottom : function() {
            JSLog.consoleViewerEl.scrollTop( JSLog.consoleViewerEl.prop('scrollHeight') );
        },

        generateConsole : function() {
            JSLog.consoleViewerEl = '<div class="console"> <div class="console-title">Snippet Console</div> <div class="console-scroll-container"> <div class="console-rows"></div> </div> </div>';
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