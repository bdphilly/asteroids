(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var MovingObject = Asteroids.MovingObject;

	var Ship = Asteroids.Ship = function(pos, radius, color) {
		this.pos = pos;
		this.radius = radius;
		this.color = color;
		this.vel = [0,0];
		//change this to user input
	}

	Function.prototype.inherits = function (superClass){
		function Surrogate(){};
		Surrogate.prototype = superClass.prototype;
		this.prototype = new Surrogate();
	}

	Ship.inherits(MovingObject);

	Ship.prototype.power = function (impulse) {
		this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
	};

	Ship.prototype.fireBullet = function() {
		var ship = this;
		if (!ship.vel === [0, 0]) {
			var speed = Math.sqrt(ship.vel[0] * ship.vel[0] + ship.vel[1] * ship.vel[1]);
			var vel = [5 * ship.vel[0] / speed, 5 * ship.vel[1] / speed];
			return new Asteroids.Bullet(ship.pos, vel, 10, "green");
		}
	};

})(this);
