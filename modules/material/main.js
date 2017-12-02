var Material = new Object();
var MaterialOptions = {
	"dimensions": 16
}

// ___________
// |         |\
// |         | \
// |         | |
// |_________| |
//  \_________\|
Material.cube = function (p) {
	this.name = p.name;
	this.type = "cube";
	this.description = p.description;
	// faces
	this.f = {"front":p.f.front, "back": p.f.back, "left": p.f.left, "right": p.f.right, "top": p.f.top, "bottom": p.f.bottom};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

// ___________
// |         |
// |         |
// |         |
// |_________|
Material.plane = function (p) {
	this.name = p.name;
	this.type = "plane";
	this.description = p.description;
	// faces
	this.f = {"front":p.f.front, "back": p.f.back};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

// ___________
// |         |\
// |         | \
//  \_________\|
Material.slap = function (p) {
	this.name = p.name;
	this.type = "slap";
	this.description = p.description;
	// faces
	this.f = {"front":p.f.front, "back": p.f.back, "left": p.f.left, "right": p.f.right, "top": p.f.top, "bottom": p.f.bottom};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

// ______
// |     |
// |     |_____
// |          |
// |          |
// |__________|
Material.step = function (p) {
	this.name = p.name;
	this.type = "step";
	this.description = p.description;
	// faces
	this.f = {"front":p.f.front, "back": p.f.back, "left": p.f.left, "right": p.f.right, "top": p.f.top, "bottom": p.f.bottom};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

function RotationMatrix(x, y, z) {
	this.x = x || 0,
	this.y = y || 0,
	this.z = z || 0;
}

function PhysicsObj() {

}
