function Fileloader() {
	this.addcss = function (src) {
		var imported = document.createElement('link');
		imported.href = src;
		console.log("loaded: " + src);
		document.head.appendChild(imported);
	}
	this.addjs = function (src) {
		var imported = document.createElement('script');
		imported.src = src;
		console.log("loaded: " + src);
		document.head.appendChild(imported);
	}
	this.ajax = function (path, callback) {
		var httpRequest = new XMLHttpRequest();
	    httpRequest.onreadystatechange = function() {
	        if (httpRequest.readyState === 4) {
	            if (httpRequest.status === 200) {
	                var data = JSON.parse(httpRequest.responseText);
	                if (callback) callback(data);
	            }
	        }
	    };
	    httpRequest.open('GET', path);
	    httpRequest.send();
	}
}

FL = new Fileloader();
