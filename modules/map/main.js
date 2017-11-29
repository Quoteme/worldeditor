function Map(p) {
	this.type = p.type;
	if (this.type == "limited") {
		this.size = {};
		this.size.x = p.size.x;
		this.size.y = p.size.y;
		this.size.z = p.size.z;

		this.data = new Array(this.size.x);
		for (var x = 0; x < this.data.length; x++) {
			for (var y = 0; y < this.data[x].length; y++) {
				for (var z = 0; z < this.data[x][y].length; z++) {
					this.data[x][y][z] = 0;
				}
			}
		}
	}
}
