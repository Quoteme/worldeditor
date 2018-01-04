option = {
	"blocksize": 16,
	"preview":{
		"width": 200,
		"height": 200
	},
	"gridsize": 10,
	"pickedBlock": 1
};

// alertify
	alertify.set('notifier','position', 'top-left');

camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 400;
camera.position.y = 200;
// camera.lookAt(new THREE.Vector3(0,0,0))
scene = new THREE.Scene();
	// visualize the world boundaries
	var gridHelper = new THREE.GridHelper( option.gridsize*option.blocksize, option.blocksize );
	scene.add( gridHelper );
renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true; // make shadows useable
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();
var orbitc = new THREE.OrbitControls( camera, renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// LOOP
function animate() {

	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();
