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
				}
			}
		}
		this.data[Math.floor(this.size.x/2)][0][Math.floor(this.size.z/2)] = 1;
	}
	this.material = [
		{"name":"test","type":"cube","description":"A simple test block. Can be deleted.","f":{"front":"resource/basic/test-front.png","back":"resource/basic/test-back.png","left":"resource/basic/test-left.png","right":"resource/basic/test-right.png","top":"resource/basic/test-top.png","bottom":"resource/basic/test-bottom.png"},"r":{"x":"0","y":"0","z":"0"},"physics":{}}
	];
}

function resizeMap (m,p) {
	// m = map file
	// p = [x,y,z] (number to increase or decrease each dimension)
	var tmp;
	tmp = new Array(m.size.x+p[0]);
	for (var x = 0; x < tmp.length; x++) {
		tmp[x] = new Array(m.size.y+p[1]);
		for (var y = 0; y < tmp[x].length; y++) {
			tmp[x][y] = new Array(m.size.z+p[2])
			for (var z = 0; z < tmp[x][y].length; z++) {
				if (typeof m.data[x] != "undefined") {
					if (typeof m.data[x][y] != "undefined") {
						if (typeof m.data[x][y][z] != "undefined") {
							tmp[x][y][z] = m.data[x][y][z];
						}else{tmp[x][y][z] = 0;}
					}else{tmp[x][y][z] = 0;}
				}else{tmp[x][y][z] = 0;}
			}
		}
	}
	m.data = tmp;
	m.size.x += p[0];
	m.size.y += p[1];
	m.size.z += p[2];
}
