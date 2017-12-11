Notify = function () {
	// create an alert in pure html that does not hold js execution
	this.alert = function(string) {
		var parent = this;
		// set a string and optionally a color
		// change width / height of the alert with xxx.msg.style.width = yyy;
		this.bg = document.createElement("DIV");
		this.msg = document.createElement("DIV");
		this.close = document.createElement("BUTTON");
		this.close.appendChild(document.createTextNode("×"));
		this.title = document.createElement("H2");
		this.title.appendChild(document.createTextNode("Alert by website"));
		this.t = document.createElement("P");
		this.t.appendChild(document.createTextNode(string));

		this.bg.style.position = "fixed";
		this.bg.style.left = 0;
		this.bg.style.top = 0;
		this.bg.style.backgroundColor = "rgba(88, 88, 88, 0.47)";
		this.bg.style.width = "100%";
		this.bg.style.height = "100vh";

		this.msg.style.width = "500px";
		this.msg.style.backgroundColor = "#dadada";
		this.msg.style.margin = "auto";
		this.msg.style.padding = "10px";
		this.msg.style.marginTop = "30px";

		this.close.style.backgroundColor = "rgb(238, 36, 90)";
		this.close.style.float = "right";
		this.close.onclick = function () {
			parent.remove();
		};

		this.title.style.textAlign = "center";
		this.title.style.fontFamily = "Monospace";

		this.t.style.whiteSpace = "pre";

		this.msg.appendChild(this.close);
		this.msg.appendChild(this.title);
		this.msg.appendChild(this.t);
		this.bg.appendChild(this.msg);
		document.body.appendChild(this.bg);

		this.remove = function() {
			this.bg.parentElement.removeChild(this.bg);
		}
	}
}

MSG = new Notify();
