raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
previousMouse = [];

renderer.domElement.oncontextmenu = function (){return false};
// renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	if (typeof file != "undefined") {
		var intersects = raycaster.intersectObjects( threeD2twoDArr(file.meshes) );
		if ( intersects.length > 0 ) {
			var intersect = intersects[ 0 ];
			// rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
			// rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
			// console.log(intersect.object.coord);
			// console.log(intersect);
		}
	}
}
function onDocumentMouseDown(event) {
	previousMouse = {
		"x": event.clientX,
		"y": event.clientY
	};
}
function onDocumentMouseUp( event ) {
	// event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( threeD2twoDArr(file.meshes) );
	if ( intersects.length > 0 && previousMouse.x == event.clientX && previousMouse.y == event.clientY) {
		var intersect = intersects[ 0 ];
		// delete cube
		if ( event.which == 3) {
			removeCube(file, intersect.object.coord[0], intersect.object.coord[1], intersect.object.coord[2]);
		// create cube
		} else {
			var clickedPoint = {
				"x":Math.floor(intersect.point.x/option.blocksize)+Math.floor(file.size.x/2),
				"y":Math.floor(intersect.point.y/option.blocksize),
				"z":Math.floor(intersect.point.z/option.blocksize)+Math.floor(file.size.z/2)
			}
			if ((intersect.point.x/option.blocksize)%1==0 && file.data[clickedPoint.x][clickedPoint.y][clickedPoint.z] != 0) { // /right/left edge
				clickedPoint.x--;
			}
			if ((intersect.point.y/option.blocksize)%1==0 && file.data[clickedPoint.x][clickedPoint.y][clickedPoint.z] != 0) { // front/back edge
				clickedPoint.y--;
			}
			if ((intersect.point.z/option.blocksize)%1==0 && file.data[clickedPoint.x][clickedPoint.y][clickedPoint.z] != 0) { // front/back edge
				clickedPoint.z--;
			}
			console.log(clickedPoint);
			console.log(intersect.point);
			console.log("___");
			// console.log("x: "+clickedPoint.x+" y: "+clickedPoint.y+" z: "+clickedPoint.z);
			if (clickedPoint.x >= 0 && clickedPoint.x < file.size.x &&
				clickedPoint.y >= 0 && clickedPoint.y < file.size.y &&
				clickedPoint.z >= 0 && clickedPoint.z < file.size.z) {
					file.data[clickedPoint.x][clickedPoint.y][clickedPoint.z] = option.pickedBlock;
					addCube(file,option.pickedBlock,clickedPoint.x,clickedPoint.y,clickedPoint.z);
			}
			// displayMap(file);
			// voxel.position.copy( intersect.point ).add( intersect.face.normal );
			// voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
		}
	}
}

function threeD2twoDArr(arr) {
	var temp = [];
	for (var x = 0; x < arr.length; x++) {
		for (var y = 0; y < arr[x].length; y++) {
			for (var z = 0; z < arr[x][y].length; z++) {
				if (typeof arr[x][y][z] != "undefined") {
					arr[x][y][z].coord = [x,y,z];
					temp.push(arr[x][y][z]);
					// console.log(arr[x][y][z]);
				}
			}
		}
	}
	return temp;
}
