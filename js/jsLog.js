var jsLog = function() {

	takeOverConsole = function() {
		console.log = interceptLog;
	}

	interceptLog = function(arguments) {
		if(arguments) {
			var log = arguments;
			appendToViewer(log);
		}
	}

	appendToViewer = function(log) {
		var log = parseLog(log);
		$("<p>"+log+"</p>").appendTo('body');
	}

	parseLog = function(log) {
		return JSON.stringify(log);
	}

	return {

		init:  function() {
			this.bindUI();
		},
		bindUI: function() {
			takeOverConsole();
			interceptLog();
		}
	}
}

var jsLog = new jsLog();
jsLog.init();