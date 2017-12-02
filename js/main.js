option = {
	"blocksize": 16
};

FL.addjs("modules/multimenu/main.js");
FL.addjs("modules/material/main.js");
FL.addjs("modules/map/main.js");

camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 400;
camera.position.y = 200;
// camera.lookAt(new THREE.Vector3(0,0,0))
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// LOOP
function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}
animate();
