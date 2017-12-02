function displayMap(m,s){
	// m = map/world/ voxelmap
	// s = scene

	// window[s] // scene
	var geometry = new THREE.BoxBufferGeometry( option.blocksize, option.blocksize, option.blocksize );
	var material = new THREE.MeshBasicMaterial( { color: 0xffbbaa } );

	if (m.type == "limited") {
		for (var x = 0; x < m.data.length; x++) {
			for (var y = 0; y < m.data[x].length; y++) {
				for (var z = 0; z < m.data[x][y].length; z++) {
					if (m.data[x][y][z] != 0) {
						mesh = new THREE.Mesh( geometry, material );
						mesh.position.set(option.blocksize*x,option.blocksize*y,option.blocksize*z);
						scene.add( mesh );
					}
				}
			}
		}
	}else {
		console.warn("unsupported map.type. Couldn't load map");
	}
}

function genMesh(p) {
	// p.type = "cube" | "step" | ...
	// p.f = faces / urls to different faces of object
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

		var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
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
