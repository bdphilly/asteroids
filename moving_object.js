(function(root) {
	var MovingObject = root.MovingObject = (root.MovingObject || {});

	function MovingObject(pos, vel, radius, color) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
	}

	MovingObject.prototype.move = function() {
		return this.pos + this.vel;
	}

	MovingObject.prototype.draw = function(canvas) {
		canvas.fillStyle = this.color;
		canvas.beginPath();
		canvas.arc(
			this.pos[0],
			this.pos[1],
			this.radius,
			0,
			2* Math.PI,
			false
		);
		canvas.fill();
		// Canvas might be ctx
	}

	MovingObject.prototype.isCollidedWith = function(otherObject) {
		var xdiff = this.pos[0] - otherObject.pos[0];
		var ydiff = this.pos[1] - otherObject.pos[1];
		var distance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
		return (this.radius + otherObject.radius > distance);
	}

})(this);

module.exports.MovingObject = this.MovingObject;