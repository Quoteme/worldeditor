function Multimenu() {
	var parent = this;

	// MAIN BOXES
	this.multimenu = document.createElement("div");
	this.multimenu.setAttribute("class", "multimenu");

	this.menubtn = document.createElement("div");
	this.menubtn.setAttribute("class", "menubtn");
	this.multimenu.appendChild(this.menubtn);

	// MENUBUTTONS
	this.light = document.createElement("div");
	this.light.setAttribute("class", "light");
	this.lightimg = document.createElement("img");
	this.lightimg.src = "modules/multimenu/resource/overview_light.png";
	this.light.appendChild(this.lightimg);
	this.menubtn.appendChild(this.light);

	this.world = document.createElement("div");
	this.world.setAttribute("class", "world");
	this.worldimg = document.createElement("img");
	this.worldimg.src = "modules/multimenu/resource/overview_world.png";
	this.world.appendChild(this.worldimg);
	this.menubtn.appendChild(this.world);

	this.animation = document.createElement("div");
	this.animation.setAttribute("class", "animation");
	this.animationimg = document.createElement("img");
	this.animationimg.src = "modules/multimenu/resource/overview_animation.png";
	this.animation.appendChild(this.animationimg);
	this.menubtn.appendChild(this.animation);

	this.event = document.createElement("div");
	this.event.setAttribute("class", "event");
	this.eventimg = document.createElement("img");
	this.eventimg.src = "modules/multimenu/resource/overview_event.png";
	this.event.appendChild(this.eventimg);
	this.menubtn.appendChild(this.event);

	this.code = document.createElement("div");
	this.code.setAttribute("class", "code");
	this.codeimg = document.createElement("img");
	this.codeimg.src = "modules/multimenu/resource/overview_code.png";
	this.code.appendChild(this.codeimg);
	this.menubtn.appendChild(this.code);

	// DISPLAY OF SELECTION
	this.menuslct = document.createElement("div");
	this.menuslct.setAttribute("class", "menuslct");
	this.title = document.createElement("h2");
	this.title.setAttribute("class", "title");
	this.container = document.createElement("div");
	this.container.setAttribute("class", "container");
	this.menuslct.appendChild(this.title);
	this.menuslct.appendChild(this.container);
	this.multimenu.appendChild(this.menuslct);

	this.light.onclick = this.world.onclick = this.animation.onclick = this.event.onclick = this.code.onclick = function () {parent.switchMenu(this)};

	this.display = function (t) {
		if (typeof t != "undefined") {
			t.appendChild(this.menuslct);
		}
		document.body.appendChild(this.multimenu);
	}

	// submenu files
	this.loadSubmenuFiles = function (name) {
		var client = new XMLHttpRequest();
		client.open('GET', name);
		client.onreadystatechange = function() {
			parent.container.innerHTML = client.responseText;
			if (client.responseText.search('id="code"')>=0) {
				document.getElementById("code").click();
			}
		}
		client.send();
	}

	this.switchMenu = function (e) {
		// change title of the menuslct
		var title = e.className;
		title = title.toUpperCase();
		this.title.innerHTML = title;
		// reset all menubtn to normal id
		var children = this.menubtn.getElementsByTagName("div");
		for (var i = 0; i < children.length; i++) {
			children[i].setAttribute("id", "");
		}
		this[e.className].setAttribute("id", "selected");
		this.loadSubmenuFiles("modules/multimenu/submenus/" + e.className + ".html");
	}
	// INIT
	this.switchMenu(this.menubtn.getElementsByTagName("div")[0]);
}

var MM = new Multimenu();
MM.display();

/*
<div class="multimenu">
	<div class="menubtn">
		<div class="light">
			<img src="modules/multimenu/resource/overview_light.png" alt="Light">
		</div>
		<div class="world">
			<img src="modules/multimenu/resource/overview_world.png" alt="Light">
		</div>
		<div class="animation">
			<img src="modules/multimenu/resource/overview_animation.png" alt="Light">
		</div>
		<div class="event">
			<img src="modules/multimenu/resource/overview_event.png" alt="Light">
		</div>
		<div class="code">
			<img src="modules/multimenu/resource/overview_code.png" alt="Light">
		</div>
	</div>
	<div class="menuslct">
		<h2 class="title"></h2>
		<div class="content">

		</div>
	</div>
</div>
*/
