(function(root) {

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject;

	var Bullet = Asteroids.Bullet = function (pos, vel, radius, color) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
	}

	Function.prototype.inherits = function(superClass) {
		function Surrogate() {};
		Surrogate.prototype = superClass.prototype;
		this.prototype = new Surrogate();
	};

	Bullet.inherits(MovingObject);

})(this);