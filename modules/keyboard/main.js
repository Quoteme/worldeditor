// add
// modules/keyboard/threex.keyboardstate.js
// to index.html
option.keyboard = {
	"reload" : "R",
	"disableOrbitc": "e"
	// "left" : "A",
	// "right" : "D",
	// "front" : "W",
	// "back" : "S",
	// "up" : "shift",
	// "down" : "space",
	// "rotateLeft" : "Q",
	// "rotateRight" : "E",
	// "rotateTop" : "C",
	// "rotateBottom": "X",
	// "speed" : 2,
	// "rotationSpeed" : 0.025
}

renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();
var orbitc = new THREE.OrbitControls( camera, renderer.domElement );
orbitc.enableKeys = false;
// orbitc.enabled = false;
var keyboard = new THREEx.KeyboardState(renderer.domElement);

function controls() {
	// old keyboard controles are no longer needed
		// if (keyboard.pressed(option.keyboard.left)) {
		// 	camera.position.x += Math.sin(camera.rotation.y-Math.PI/2)*option.keyboard.speed;
		// 	camera.position.z += Math.cos(camera.rotation.y-Math.PI/2)*option.keyboard.speed;
		// }if (keyboard.pressed(option.keyboard.right)) {
		// 	camera.position.x += Math.sin(camera.rotation.y+Math.PI/2)*option.keyboard.speed;
		// 	camera.position.z += Math.cos(camera.rotation.y+Math.PI/2)*option.keyboard.speed;
		// }if (keyboard.pressed(option.keyboard.up)) {
		// 	camera.position.y -= option.keyboard.speed;
		// }if (keyboard.pressed(option.keyboard.down)) {
		// 	camera.position.y += option.keyboard.speed;
		// }if (keyboard.pressed(option.keyboard.front)) {
		// 	camera.position.x -= Math.sin(camera.rotation.y)*option.keyboard.speed;
		// 	camera.position.z -= Math.cos(camera.rotation.y)*option.keyboard.speed;
		// }if (keyboard.pressed(option.keyboard.back)) {
		// 	camera.position.x += Math.sin(camera.rotation.y)*option.keyboard.speed;
		// 	camera.position.z += Math.cos(camera.rotation.y)*option.keyboard.speed;
		// }if (keyboard.pressed(option.keyboard.rotateLeft)) {
		// 	camera.rotation.y += option.keyboard.rotationSpeed;
		// }if (keyboard.pressed(option.keyboard.rotateRight)) {
		// 	camera.rotation.y -= option.keyboard.rotationSpeed;
		// }if (keyboard.pressed(option.keyboard.rotateTop)) {
		// 	camera.rotation.x += option.keyboard.rotationSpeed;
		// }if (keyboard.pressed(option.keyboard.rotateBottom)) {
		// 	camera.rotation.x -= option.keyboard.rotationSpeed;
		// }
	requestAnimationFrame( controls );
}
controls();

// only on keydown
keyboard.domElement.addEventListener('keydown', function(event){
	if( keyboard.eventMatches(event, option.keyboard.reload) ){
		displayMap(file);
	}
	if( keyboard.eventMatches(event, option.keyboard.disableOrbitc) ){
		enableOrbitControl();
	}
})

function enableOrbitControl() {
	orbitc.enabled = !orbitc.enabled;
}
