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
	// faces
	this.f = {"front":p.f.front, "back": p.f.back};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

// __
// | ¯\
// |   ¯\
// |     ¯\
// |       ¯\
// |__________\
Material.slope = function (p) {
	// faces
	this.f = {"slope":p.f.slope, "back": p.f.back, "left": p.f.left, "right": p.f.right, "bottom": p.f.bottom};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

// ___
// |  ¯¯\
// |     ¯¯\
// |        ¯¯\
// |          |
// |__________|
Material.slopeHalfTop = function (p) {
	// faces
	this.f = {"front":p.f.front, "slope":p.f.slope, "back": p.f.back, "left": p.f.left, "right": p.f.right, "bottom": p.f.bottom};
	// rotation
	this.r = new RotationMatrix(p.r.x, p.r.y, p.r.z);
	// physics
	this.physics = new PhysicsObj();
}

// ___
// |  ¯¯\
// |     ¯¯\
// |________¯¯\
Material.slopeHalfBottom = function (p) {
	// faces
	this.f = {"slope":p.f.slope, "back": p.f.back, "left": p.f.left, "right": p.f.right, "bottom": p.f.bottom};
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
