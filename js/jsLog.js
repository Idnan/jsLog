var jsLog = function() {

	takeOverConsole = function() {
		console.log = interceptLog;
	}

	interceptLog = function(arguments) {
		if(arguments) {
			var log = parseLog(arguments);
			appendToViewer(log);
		}
	}

	appendToViewer = function(log) {
		$("<p>"+log+"</p>").appendTo('.jslogviewer');
	}

	parseLog = function(log) {
		return JSON.stringify(log);
	}

	initViewer = function() {
		var viewer = "<div class='jslogviewer'></div>";
		$(viewer).appendTo('body');
	}

	return {

		init:  function() {
			this.bindUI();
			initViewer();
		},
		bindUI: function() {
			takeOverConsole();
			interceptLog();
		}
	}
}

var jsLog = new jsLog();
jsLog.init();