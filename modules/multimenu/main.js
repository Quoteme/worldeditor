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
	this.loadSubmenuFiles = function (name,callback) {
		console.log("loaded: "+loaded);
		loaded++;
		var client = new XMLHttpRequest();
		var loaded = 0;
		client.open('GET', name);
		client.onreadystatechange = function() {
			parent.container.innerHTML = client.responseText;
			if (client.responseText.search('id="code"')>0 && loaded <= 0) {
				loaded++;
				setTimeout(function() {
					document.getElementById("code").click();
				},1)
			}
			if (typeof callback != "undefined") {
				callback();
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

// vars
	var MM = new Multimenu();
	MM.display();
	previewBlock = new PREVIEW([200,200]);

var sbmenu_file_new = new Object();
sbmenu_file_new.newMap = function () {
	file = new VoxelMap({
		"name": document.getElementsByClassName("name")[0].value,
		"type": document.getElementsByClassName("type")[0].value,
		"size": {
			"x": parseInt(document.getElementById("xsize").value),
			"y": parseInt(document.getElementById("ysize").value),
			"z": parseInt(document.getElementById("zsize").value)
		},
		"author": document.getElementsByClassName("author")[0].value,
		"note": document.getElementsByClassName("note")[0].value
	});
}

function blockOverview(mesh,output) {
	this.cntnr = document.createElement("div");
	this.cntnr.style.width = previewBlock.size.x;
	this.cntnr.style.height = previewBlock.size.y;
	previewBlock.image(mesh, function (img) {
		this.cntnr.innerHTML = "<img src='"+ img +"'>";
	})
	output.appendChild(this.cntnr);
}

function editMaterial(num) {
	MM.loadSubmenuFiles("modules/multimenu/submenus/world_addmaterial.html",function() {
		console.log(file.material[num]);
		document.getElementsByClassName("name")[0].value = file.material[num].name;
		document.getElementsByClassName("description")[0].value = file.material[num].description;
		document.getElementsByClassName("type")[0].value = file.material[num].type;
		document.getElementsByClassName("xrotatate")[0].value = file.material[num].r.x;
		document.getElementsByClassName("yrotatate")[0].value = file.material[num].r.y;
		document.getElementsByClassName("zrotatate")[0].value = file.material[num].r.z;
		document.getElementById("cube-url-right").value = file.material[num].f.right;
		document.getElementById("cube-url-left").value = file.material[num].f.left;
		document.getElementById("cube-url-top").value = file.material[num].f.top;
		document.getElementById("cube-url-bottom").value = file.material[num].f.bottom;
		document.getElementById("cube-url-front").value = file.material[num].f.front;
		document.getElementById("cube-url-back").value = file.material[num].f.back;
		document.getElementById("opacity").value = file.material[num].opacity;
		document.getElementById("addButton").innerHTML = "save changes";
		document.getElementById("addButton").onclick = function () {
			file.material[num] = sbmenu_world.genMaterial();
			MM.loadSubmenuFiles('modules/multimenu/submenus/world.html')
		}
	});
}

var sbmenu_world = new Object();
sbmenu_world.updateOverview = function () {
	if (typeof file != "undefined") {
		document.getElementsByClassName('overview')[0].innerHTML = "";
		// make all the different materials display up as a choice in the world menu
		addOverview(0);
		// go through all blocks one after the other and add them in
		function addOverview(number) {
			if (number<file.material.length) {
				if (file.material[number]!="") {
					var mesh = genMesh(file.material[number]);
					previewBlock.image(mesh, function (img) {
						// document.getElementsByClassName('overview')[0].innerHTML += "<div class='overviewItem' style='width:"+previewBlock.size.x+"px; height:"+previewBlock.size.y+"px; background-image:url("+img+")'><div class='overviewinnerItem'><span class='name'>"+file.material[number].name+"</span><br>file.material[number].name<span id='description'>"+file.material[number].description+"</span><br><button class='editor' onclick='editMaterial("+number+");' title='edit'><img style='height:14px;' src='modules/multimenu/resource/settings.png'></button><button class='deleter' title='delete' onclick='alertify.confirm(\"Confirm\", \"Are you sure you want to delete this material?\", function(){ alertify.success(\"Deleted succesfully\");removeMaterial("+number+"); }, function(){ alertify.error(\"Not deleted\")});'><img style='height:14px' src='modules/multimenu/resource/delete.png'></button><button class='picker' title='pick this block to draw' onclick='option.pickedBlock = "+(number+1)+"'><img style='height:14px;' src='modules/multimenu/resource/picker.png'></button></div></div><br>";

						document.getElementsByClassName('overview')[0].innerHTML += "<div class='overviewItem' style='background-image:url("+img+")'><div class='overviewinnerItem'><span class='name'>"+file.material[number].name+"</span><br><span id='description'>"+file.material[number].description+"</span><br><button class='editor' onclick='editMaterial("+number+");' title='edit'><img style='height:14px;' src='modules/multimenu/resource/settings.png'></button><button class='deleter' title='delete' onclick='alertify.confirm(\"Confirm\", \"Are you sure you want to delete this material?\", function(){ alertify.success(\"Deleted succesfully\");removeMaterial("+number+"); }, function(){ alertify.error(\"Not deleted\")});'><img style='height:14px' src='modules/multimenu/resource/delete.png'></button><button class='picker' title='pick this block to draw' onclick='option.pickedBlock = "+(number+1)+"'><img style='height:14px;' src='modules/multimenu/resource/picker.png'></button></div></div>";
						// document.getElementsByClassName('overview')[0].innerHTML += "<button class='picker' title='pick this block to draw'><img style='height:14px;' src='modules/multimenu/resource/picker.png'></button>";
						// MSG.confirm(\"Are you sure you want to delete this material?\",[[\"Yes\",function(){removeMaterial("+number+");MSG.alert(\"deleted succesfully\");}]]);
						addOverview(number+1);
					})
				}
			}
		}
	}else {
		alertify.warning('No project has been loaded', 'success', 5, function(){  console.log('dismissed'); })
	}
	// file.material[i]
}
sbmenu_world.previewButton = function() {
	previewMaterial = sbmenu_world.genMaterial()
	var mesh = genMesh(previewMaterial);

	previewBlock.image(mesh, function (img) {
		document.getElementsByClassName('materialPreview')[0].innerHTML = "<img src='" + img + "' alt='could not create Preview'></a>";
	})
}

sbmenu_world.genMaterial = function () {
	// if a user can load a map of textures, just by giving the general name (ie. "test", instead of "test-right", "test-top", "...")
	if (document.getElementsByClassName("indiviudalTextures")[0].checked) {
		var newMaterial = new Material[document.getElementsByClassName('type')[0].value]({
			"name": document.getElementsByClassName("name")[0].value,
			"description": document.getElementsByClassName("description")[0].value,
			"f":{
				"right": document.getElementById(document.getElementsByClassName('type')[0].value+"-url").value.replace('.', '-right.'),
				"left": document.getElementById(document.getElementsByClassName('type')[0].value+"-url").value.replace('.', '-left.'),
				"top": document.getElementById(document.getElementsByClassName('type')[0].value+"-url").value.replace('.', '-top.'),
				"bottom": document.getElementById(document.getElementsByClassName('type')[0].value+"-url").value.replace('.', '-bottom.'),
				"front": document.getElementById(document.getElementsByClassName('type')[0].value+"-url").value.replace('.', '-front.'),
				"back": document.getElementById(document.getElementsByClassName('type')[0].value+"-url").value.replace('.', '-back.')
			},
			"r":{
				"x":document.getElementsByClassName("xrotatate")[0].value, "y":document.getElementsByClassName("yrotatate")[0].value, "z":document.getElementsByClassName("zrotatate")[0].value
			},
			"opacity": parseFloat(document.getElementById("opacity").value)
		});
	}
	else {
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
			},
			"opacity": parseFloat(document.getElementById("opacity").value)
		});
	}
	return newMaterial;
}

sbmenu_world.displayFaceURLpicker = function(){
	for (var i = 0; i < document.getElementsByClassName('specificSettings')[0].getElementsByTagName('div').length; i++) {
		document.getElementsByClassName('specificSettings')[0].getElementsByTagName('div')[i].style.display = 'none';
	}
	if (document.getElementsByClassName("indiviudalTextures")[0].checked) {
		document.getElementsByClassName(document.getElementsByClassName("type")[0].value + "Oneface")[0].style.display = 'block';
	}else {
		document.getElementsByClassName(document.getElementsByClassName("type")[0].value)[0].style.display = 'block';
	}
}

sbmenu_world.addMaterial = function(){
	var addedToList = false;
	for (var v in file.material) {
		if (file.material.hasOwnProperty(v)) {
			if (file.material[v] == "") {
				file.material[v] = sbmenu_world.genMaterial();
				addedToList = true;
				break;
			}
		}
	}
	if (!addedToList) {
		file.material.push(sbmenu_world.genMaterial());
	}
}

function downloadMap(){
	var temp = _.cloneDeep(file);
	delete temp.meshes;
	delete temp.samples;
	temp = JSON.stringify(temp);
	download("file.json", temp);
}

function uploadMap() {
	var selectedFile = document.getElementById('clientjson').files[0];
	var reader = new FileReader();
        reader.onload = function(event)
        {
            var contents = event.target.result;
			file = JSON.parse(contents);
			displayMap(file,scene);
			helperGrid(file.size.x,file.size.y);

			alertify.success('Map has been loaded.');
        };

        reader.readAsText(selectedFile);
}

function helperGrid(x,y) {
	if (typeof gridHelper != "undefined") {
		scene.remove(gridHelper);
	}
	gridHelper = new THREE.Mesh( new THREE.PlaneGeometry( option.blocksize*x, option.blocksize*y, x, y ), new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide, wireframe: true} ) );
	gridHelper.rotation.x = Math.PI/2;
	scene.add( gridHelper );
}

// allows for simple download of strings
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
