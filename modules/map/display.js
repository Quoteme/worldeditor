// temp before light class implemented
	var light = new THREE.AmbientLight( 0xffffff, 0.2 ); // soft white light
	scene.add( light );
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
	directionalLight.position.set(1,1,1);
	scene.add( directionalLight );

function displayMap(m, s){
	// m = map/world/ voxelmap
	// s = scene
	// window[s] // scene
	if (typeof s == "undefined") {
		s = scene;
	}
	resetMeshes(s);

	m.samples = [];
	m.meshes = [];
	for (var i = 0; i < m.material.length; i++) {
		m.samples[i+1] = genMesh(m.material[i],[option.blocksize,option.blocksize,option.blocksize]);
	}
	var geometry = new THREE.BoxBufferGeometry( option.blocksize, option.blocksize, option.blocksize );
	var material = new THREE.MeshBasicMaterial( { color: 0xffbbaa } );

	if (m.type == "limited") {
		m.meshes = new Array(m.data.length);
		for (var x = 0; x < m.data.length; x++) {
			m.meshes[x] = new Array(m.data[x].length);
			for (var y = 0; y < m.data[x].length; y++) {
				m.meshes[x][y] = new Array(m.data[x][y].length);
				for (var z = 0; z < m.data[x][y].length; z++) {
					m.meshes[x][y][z] = new Array(m.data[x][y][z].length);
					if (m.data[x][y][z] != 0) {
						m.meshes[x][y][z] = m.samples[ m.data[x][y][z] ].clone();
						m.meshes[x][y][z].position.set(option.blocksize*x,option.blocksize*y,option.blocksize*z);
						scene.add(m.meshes[x][y][z]);
					}
				}
			}
		}
	}else {
		console.warn("unsupported map.type. Couldn't load map");
	}
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
		var material_right = new THREE.MeshLambertMaterial( { map: texture_right } )
		var material_left = new THREE.MeshLambertMaterial( { map: texture_left } )
		var material_top = new THREE.MeshLambertMaterial( { map: texture_top } )
		var material_bottom = new THREE.MeshLambertMaterial( { map: texture_bottom } );
		var material_front = new THREE.MeshLambertMaterial( { map: texture_front } )
		var material_back = new THREE.MeshLambertMaterial( { map: texture_back } )
		var mesh = new THREE.Mesh( geometry, [material_right,material_left,material_top,material_bottom,material_front,material_back] );
	}
	mesh.rotation.x = Math.PI*0.5 * p.r.x;
	mesh.rotation.y = Math.PI*0.5 * p.r.y;
	mesh.rotation.z = Math.PI*0.5 * p.r.z;
	return mesh;
}

function previewBlock(size) {
	// size[0] = x size[1] = y
	this.camera = new THREE.OrthographicCamera( -size[0], size[0], size[1], -size[1], 1, 1000 );
	this.camera.position.x = 220;
	this.camera.position.y = 220;
	this.camera.position.z = 220;
	this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
	// this.renderer = new THREE.CanvasRenderer();
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( size[0], size[1] );

	this.light = new THREE.AmbientLight( 0xffffff, 0.25 ); // soft white light
	this.scene.add( this.light );
	this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	this.directionalLight.position.set( 0,400,400 );
	this.scene.add( this.directionalLight );

	this.render = function (mesh) {
		this.scene.remove(exmpl);
		var exmpl = mesh;
		this.scene.add(exmpl);
		this.renderer.render( this.scene, this.camera );
		return this.renderer.domElement.toDataURL();
	}
}

function resetScene(s) {
	s.children.forEach(function(object){
	    s.remove(object);
	});
}

function resetMeshes(s) {
	s.children.forEach(function(object){
		if (object.type == "Mesh") {
			s.remove(object);
		}
	});
}
