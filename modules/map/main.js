FL.addjs("modules/map/display.js");

function VoxelMap(p) {
	this.type = p.type;
	this.name = p.name;
	this.author= p.author;
	this.note = p.note;
	if (this.type == "limited") {
		this.size = {};
		this.size.x = p.size.x;
		this.size.y = p.size.y;
		this.size.z = p.size.z;

		this.data = new Array(this.size.x);
		for (var x = 0; x < this.data.length; x++) {
			this.data[x] = new Array(this.size.y);
			for (var y = 0; y < this.data[x].length; y++) {
				this.data[x][y] = new Array(this.size.z)
				for (var z = 0; z < this.data[x][y].length; z++) {
					this.data[x][y][z] = 0;
					// simple ground generator
					if (y == 0) {
						this.data[x][y][z] = 1;
					}
					// end simple ground generator
				}
			}
		}
	}
	this.material = [
		{"name":"test","type":"cube","description":"A simple test block. Can be deleted.","f":{"front":"resource/basic/Test-front.png","back":"resource/basic/Test-back.png","left":"resource/basic/Test-left.png","right":"resource/basic/Test-right.png","top":"resource/basic/Test-top.png","bottom":"resource/basic/Test-bottom.png"},"r":{"x":"0","y":"0","z":"0"},"physics":{}}
	];
}
