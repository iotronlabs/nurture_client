// Prevent right click and inspect tab
function preventInspect() {
	document.addEventListener('keydown', function() {
		if (event.keyCode == 123)
		{
			return false;
		}
		if (event.ctrlKey && event.shiftKey && event.keyCode == 73)
		{
			return false;
		}
		if (event.ctrlKey && event.keyCode == 85)
		{
			return false;
		}
		if (event.ctrlKey && event.keyCode == 86)
		{
			return false;
		}
		if (event.ctrlKey && event.keyCode == 88)
		{
			return false;
		}
		if (event.ctrlKey && event.keyCode == 67)
		{
			return false;
		}
	}, false);

	if (document.addEventListener) {
		document.addEventListener('contextmenu', function(e) {
			e.preventDefault();
		}, false);
		} else {
		document.attachEvent('oncontextmenu', function() {
			window.event.returnValue = false;
		});
	}

}

preventInspect()
