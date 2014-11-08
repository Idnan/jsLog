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
		$("<p>"+log+"</p>").hide().appendTo('.jslogviewer').fadeIn('slow');
		scrollToBottom();
	}

	scrollToBottom = function() {
		$('.jslogviewer').scrollTop($('.jslogviewer').prop('scrollHeight'));
	}

	parseLog = function(log) {
		return JSON.stringify(log);
	}

	initViewer = function() {
		var viewer = "<div class='jslogviewer'><span id='minimize'>-</span></div>";
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