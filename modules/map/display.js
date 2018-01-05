// temp before light class implemented
	var light = new THREE.AmbientLight( 0xffffff, 0.2 ); // soft white light
	scene.add( light );
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
	directionalLight.position.set(1,1,1);
	scene.add( directionalLight );
	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( option.blocksize*10, option.blocksize*10, option.blocksize*10);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = Math.pow(2,11); // default is 512
	spotLight.shadow.mapSize.height = Math.pow(2,11); // default is 512
	scene.add( spotLight );

var worldGeo;
function displayMap(m, s){
	// m = map/world/ voxelmap
	// s = scene
	// window[s] // scene
	if (typeof s == "undefined") {
		s = scene;
	}
	if (typeof s.getObjectByName("worldGeo") != "undefined") {
		s.remove(s.getObjectByName("worldGeo"));
	}
	m.meshes = [];
	var geometry = new THREE.BoxBufferGeometry( option.blocksize, option.blocksize, option.blocksize );
	var material = new THREE.MeshBasicMaterial( { color: 0xffbbaa } );
	worldGeo = new THREE.Group;
	worldGeo.name = "worldGeo";
	if (m.type == "limited") {
		m.meshes = new Array(m.data.length);
		for (var x = 0; x < m.data.length; x++) {
			m.meshes[x] = new Array(m.data[x].length);
			for (var y = 0; y < m.data[x].length; y++) {
				m.meshes[x][y] = new Array(m.data[x][y].length);
				for (var z = 0; z < m.data[x][y].length; z++) {
					if (m.material[m.data[x][y][z]-1]=="") {
						// if a space is found that has a value with no coresponding material, reset it to 0
						m.data[x][y][z] = 0;
					}
					else if (m.data[x][y][z] != 0) {
						addCube(m,m.data[x][y][z],x,y,z,false);
					}
				}
			}
		}
		scene.add(worldGeo);
	}else {
		console.warn("unsupported map.type. Couldn't load map");
	}
}

function addCube(m,type,x,y,z,neighbourCheck) {
	// neighbourcheck checks the voxels around a given voxel for shared faces and makes them invisible if needed
	if (typeof neighbourCheck == "undefined") {
		neighbourCheck = true;
	}
	m.data[x][y][z] = type;
	m.meshes[x][y][z] = genMesh(m.material[type-1],[option.blocksize,option.blocksize,option.blocksize]);
	m.meshes[x][y][z].coord = [x,y,z];
	// remove faces that are blocked by other blocks
		if (typeof m.data[x+1] != "undefined") {
			if (m.data[x+1][y][z] != 0) {
				if (m.material[m.data[x+1][y][z]-1].opacity == 1 || m.data[x+1][y][z] == m.data[x][y][z]) {
					m.meshes[x][y][z].material[0].visible = false;
					if (neighbourCheck) {
						m.meshes[x+1][y][z].material[1].visible = false;
					}
				}
			}
		}
		if (typeof m.data[x-1] != "undefined") {
			if (m.data[x-1][y][z] != 0) {
				if (m.material[m.data[x-1][y][z]-1].opacity == 1 || m.data[x-1][y][z] == m.data[x][y][z]) {
					m.meshes[x][y][z].material[1].visible = false;
					if (neighbourCheck) {
						m.meshes[x-1][y][z].material[0].visible = false;
					}
				}
			}
		}
		if (typeof m.data[x][y+1] != "undefined") {
			if (m.data[x][y+1][z] != 0) {
				if (m.material[m.data[x][y+1][z]-1].opacity == 1 || m.data[x][y+1][z] == m.data[x][y][z]) {
					m.meshes[x][y][z].material[2].visible = false;
					if (neighbourCheck) {
						m.meshes[x][y+1][z].material[3].visible = false;
					}
				}
			}
		}
		if (typeof m.data[x][y-1] != "undefined") {
			if (m.data[x][y-1][z] != 0) {
				if (m.material[m.data[x][y-1][z]-1].opacity == 1 || m.data[x][y-1][z] == m.data[x][y][z]) {
					m.meshes[x][y][z].material[3].visible = false;
					if (neighbourCheck) {
						m.meshes[x][y-1][z].material[2].visible = false;
					}
				}
			}
		}
		if (typeof m.data[x][y][z+1] != "undefined") {
			if (m.data[x][y][z+1] != 0) {
				if (m.material[m.data[x][y][z+1]-1].opacity == 1 || m.data[x][y][z+1] == m.data[x][y][z]) {
					m.meshes[x][y][z].material[4].visible = false;
					if (neighbourCheck) {
						m.meshes[x][y][z+1].material[5].visible = false;
					}
				}
			}
		}
		if (typeof m.data[x][y][z-1] != "undefined") {
			if (m.data[x][y][z-1] != 0) {
				if (m.material[m.data[x][y][z-1]-1].opacity == 1 || m.data[x][y][z-1] == m.data[x][y][z]) {
					m.meshes[x][y][z].material[5].visible = false;
					if (neighbourCheck) {
						m.meshes[x][y][z-1].material[4].visible = false;
					}
				}
			}
		}
	m.meshes[x][y][z].castShadow = true;
	m.meshes[x][y][z].receiveShadow = true;
	m.meshes[x][y][z].position.set(option.blocksize*x-((m.size.x/2)*option.blocksize-option.blocksize/2),option.blocksize*y+option.blocksize/2,option.blocksize*z-((m.size.z/2)*option.blocksize-option.blocksize/2));
	worldGeo.add(m.meshes[x][y][z]);
}

function removeCube(m,x,y,z) {
	m.data[x][y][z] = 0;
	if (x-1 >= 0) {
		if (m.data[x-1][y][z] != 0) {
			m.meshes[x-1][y][z].material[0].visible = true;
		}
	}
	if (x+1 <= m.size.x) {
		if (m.data[x+1][y][z] != 0) {
			m.meshes[x+1][y][z].material[1].visible = true;
		}
	}
	if (y-1 >= 0) {
		if (m.data[x][y-1][z] != 0) {
			m.meshes[x][y-1][z].material[2].visible = true;
		}
	}
	if (y-1 <= m.size.y) {
		if (m.data[x][y+1][z] != 0) {
			m.meshes[x][y+1][z].material[3].visible = true;
		}
	}
	if (z-1 >= 0) {
		if (m.data[x][y][z-1] != 0) {
			m.meshes[x][y][z-1].material[4].visible = true;
		}
	}
	if (z-1 <= file.size.z) {
		if (m.data[x][y][z+1] != 0) {
			m.meshes[x][y][z+1].material[5].visible = true;
		}
	}
	delete file.meshes[x][y][z];
	worldGeo.remove(worldGeo.children[findMesh(x,y,z)]);
}

// returns the place of a cube inside the "worldGeo" array, just by looking at its position
function findMesh(x,y,z) {
	var tmp;
	for (var i = 0; i < worldGeo.children.length; i++) {
		if (worldGeo.children[i].coord[0] == x &&
			worldGeo.children[i].coord[1] == y &&
			worldGeo.children[i].coord[2] == z) {
			tmp = i;
		}
	}
	return tmp;
}

function genMesh(p, size) {
	// p.type = "cube" | "step" | ...
	// p.f = faces / urls to different faces of object

	if (typeof size == "undefined" ) {
		size = [200,200,200];
	}
	if (p.type == "cube") {
		var texture_right = new THREE.TextureLoader().load( p.f.right );
		var texture_left = new THREE.TextureLoader().load( p.f.left );
		var texture_top = new THREE.TextureLoader().load( p.f.top );
		var texture_bottom = new THREE.TextureLoader().load( p.f.bottom );
		var texture_front = new THREE.TextureLoader().load( p.f.front );
		var texture_back = new THREE.TextureLoader().load( p.f.back );
		texture_front.magFilter = texture_back.magFilter = texture_left.magFilter = texture_right.magFilter = texture_top.magFilter = texture_bottom.magFilter = THREE.NearestFilter;
		texture_front.minFilter = texture_back.minFilter = texture_left.minFilter = texture_right.minFilter = texture_top.minFilter = texture_bottom.minFilter = THREE.NearestFilter;
		texture_front.wrapT = texture_back.wrapT = texture_left.wrapT = texture_right.wrapT = texture_top.wrapT = texture_bottom.wrapT = THREE.RepeatWrapping;
		texture_front.wrapS = texture_back.wrapS = texture_left.wrapS = texture_right.wrapS = texture_top.wrapS = texture_bottom.wrapS = THREE.RepeatWrapping;

		var geometry = new THREE.BoxBufferGeometry( size[0], size[1], size[2] );
		var material_right = new THREE.MeshLambertMaterial( { map: texture_right, transparent: true, opacity: p.opacity } )
		var material_left = new THREE.MeshLambertMaterial( { map: texture_left, transparent: true, opacity: p.opacity } )
		var material_top = new THREE.MeshLambertMaterial( { map: texture_top, transparent: true, opacity: p.opacity } )
		var material_bottom = new THREE.MeshLambertMaterial( { map: texture_bottom, transparent: true, opacity: p.opacity } );
		var material_front = new THREE.MeshLambertMaterial( { map: texture_front, transparent: true, opacity: p.opacity } )
		var material_back = new THREE.MeshLambertMaterial( { map: texture_back, transparent: true, opacity: p.opacity } )
		var mesh = new THREE.Mesh( geometry, [material_right,material_left,material_top,material_bottom,material_front,material_back] );
	}
	mesh.rotation.x = Math.PI*0.5 * p.r.x;
	mesh.rotation.y = Math.PI*0.5 * p.r.y;
	mesh.rotation.z = Math.PI*0.5 * p.r.z;
	return mesh;
}

function PREVIEW(size, output) {
	// TODO: GET THIS "block preview" to work and return an image, instead of a webgl context
	// size[0] = x size[1] = y
	this.size = {
		"x": size[0],
		"y": size[1]
	}
	this.camera = new THREE.OrthographicCamera( -size[0], size[0], size[1], -size[1], 1, 1000 );
	this.camera.position.x = 220;
	this.camera.position.y = 220;
	this.camera.position.z = 220;
	this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
	// this.renderer = new THREE.CanvasRenderer();
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.camera.aspect = size[0] / size[1];
	this.camera.updateProjectionMatrix();
	this.renderer.setSize( size[0], size[1] );

	this.light = new THREE.AmbientLight( 0xffffff, 0.25 ); // soft white light
	this.scene.add( this.light );
	this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	this.directionalLight.position.set( 0,400,400 );
	this.scene.add( this.directionalLight );

	if (typeof output != "undefined") {
		output.appendChild( this.renderer.domElement );
	}
	var parent = this;
	this.image = function (mesh, callback) {
		parent.scene.remove( parent.test );
		parent.test = mesh;
		parent.scene.add( parent.test );
		setTimeout( function () {
			parent.render();
			callback(parent.renderer.domElement.toDataURL());
		}, 50);
	}
	this.render = function () {
		parent.renderer.render( parent.scene, parent.camera );
		// requestAnimationFrame(parent.render);
		if (parent.returnImage == true) {
			parent.returnImage = false;
		}
	}
	this.render();
}

function resetScene(s) {
	s.children.forEach(function(object){
	    s.remove(object);
	});
}
