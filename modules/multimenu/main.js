function Multimenu() {
	var parent = this;

	// MAIN BOXES
	this.multimenu = document.createElement("div");
	this.multimenu.setAttribute("class", "multimenu");

	this.menubtn = document.createElement("div");
	this.menubtn.setAttribute("class", "menubtn");
	this.multimenu.appendChild(this.menubtn);

	this.submenu = function(name, icon) {
		parent[name] = document.createElement("div");
		parent[name].setAttribute("class", name);
		parent[name + "img"] = document.createElement("img");
		parent[name + "img"].src = icon;
		parent[name].appendChild(parent[name + "img"]);
		parent.menubtn.appendChild(parent[name]);
		parent[name].onclick = function () {parent.switchMenu(this)};
	}

	this.submenu("file", "modules/multimenu/resource/overview_file.png");
	this.submenu("light", "modules/multimenu/resource/overview_light.png");
	this.submenu("world", "modules/multimenu/resource/overview_world.png");
	this.submenu("animation", "modules/multimenu/resource/overview_animation.png");
	this.submenu("event", "modules/multimenu/resource/overview_event.png");
	this.submenu("code", "modules/multimenu/resource/overview_code.png");

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

	// this.light.onclick = this.world.onclick = this.animation.onclick = this.event.onclick = this.code

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

var pcamera = new Object();
var pscene = new Object();
var prenderer = new Object();
var pmesh = new Object();
function initPreview(size,cntnr,name) {
	// size = size of the canvas used in the end
	// cntnr = container in which the canvas is stored
	var tmp = new Object();
	tmp.onWindowResize = function () {
		pcamera[name].aspect = size[0] / size[1];
		pcamera[name].updateProjectionMatrix();
		prenderer[name].setSize( size[0], size[1] );
	}
	tmp.animate = function () {
		requestAnimationFrame( tmp.animate );
		if (typeof pmesh[name] == "object") {
			// pmesh[name].rotation.x += 0.005;
			// pmesh[name].rotation.y += 0.01;
		}
		prenderer[name].render( pscene[name], pcamera[name] );
	}

	// pcamera[name] = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	// var canvas = cntnr.getElementsByTagName("canvas")[0]
	pcamera[name] = new THREE.OrthographicCamera( -size[0], size[0], size[1], -size[1], 1, 1000 );

	pcamera[name].position.x = 220;
	pcamera[name].position.y = 220;
	pcamera[name].position.z = 220;
	pcamera[name].lookAt(new THREE.Vector3(0,0,0));
	pscene[name] = new THREE.Scene();

	var light = new THREE.AmbientLight( 0xffffff, 0.25 ); // soft white light
	pscene[name].add( light );
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.position.set( 0,400,400 );
	// directionalLight.target.position.set( 0,0,0);
	pscene[name].add( directionalLight );

	prenderer[name] = new THREE.WebGLRenderer();
	prenderer[name].setPixelRatio( window.devicePixelRatio );
	pcamera[name].aspect = size[0] / size[1];
	pcamera[name].updateProjectionMatrix();
	prenderer[name].setSize( size[0], size[1] );
	prenderer[name].domElement.id = name;
	cntnr.appendChild( prenderer[name].domElement );
	//
	window.addEventListener( 'resize', tmp.onWindowResize, false );
	tmp.animate();
}
function updatePreview(name, mesh) {
	pscene[name].remove(pmesh[name]);
	pmesh[name] = mesh;
	// pmesh[name].rotation.x = Math.PI*0.5 * document.getElementsByClassName("xrotatate")[0].value;
	// pmesh[name].rotation.y = Math.PI*0.5 * document.getElementsByClassName("yrotatate")[0].value;
	// pmesh[name].rotation.z = Math.PI*0.5 * document.getElementsByClassName("zrotatate")[0].value;
	pscene[name].add( pmesh[name] );
}

var sbmenu_file_new = new Object();
sbmenu_file_new.newMap = function () {
	file = new VoxelMap({
		"name": document.getElementsByClassName("name")[0].value,
		"type": document.getElementsByClassName("type")[0].value,
		"size": {
			"x": document.getElementById("xsize").value,
			"y": document.getElementById("ysize").value,
			"z": document.getElementById("zsize").value
		},
		"author": document.getElementsByClassName("author")[0].value,
		"note": document.getElementsByClassName("note")[0].value
	});
}

var sbmenu_world = new Object();
sbmenu_world.updateOverview = function () {
	// make all the different materials display up as a choice in the world menu
	if (typeof file != "undefined") {
		for (var i = 0; i < file.material.length; i++) {
			initPreview([200,200],document.getElementsByClassName('overview')[0],"preview_"+i);
			document.getElementById("preview_"+i).className = "preview";
			updatePreview("preview_"+i,genMesh(file.material[i]));
		}
	}
	// file.material[i]
}
sbmenu_world.previewButton = function() {
	var previewMaterial = new Material.cube({"name":"test",
		"f":{
			"right": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-right").value,
			"left": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-left").value,
			"top": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-top").value,
			"bottom": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-bottom").value,
			"front": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-front").value,
			"back": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-back").value
		},
		"r":{
			"x":document.getElementsByClassName("xrotatate")[0].value, "y":document.getElementsByClassName("yrotatate")[0].value, "z":document.getElementsByClassName("zrotatate")[0].value
		}
	})
	var mesh = genMesh(previewMaterial);
	updatePreview("test",mesh);
}
sbmenu_world.addMaterial = function () {
	var newMaterial = new Material[document.getElementsByClassName('type')[0].value]({
		"name": document.getElementsByClassName("name")[0].value,
		"description": document.getElementsByClassName("description")[0].value,
		"f":{
			"right": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-right").value,
			"left": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-left").value,
			"top": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-top").value,
			"bottom": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-bottom").value,
			"front": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-front").value,
			"back": document.getElementById(document.getElementsByClassName('type')[0].value+"-url-back").value
		},
		"r":{
			"x":document.getElementsByClassName("xrotatate")[0].value, "y":document.getElementsByClassName("yrotatate")[0].value, "z":document.getElementsByClassName("zrotatate")[0].value
		}
	});
	file.material.push(newMaterial);
}
