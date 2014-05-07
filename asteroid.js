(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var MovingObject = Asteroids.MovingObject;

	var Asteroid = Asteroids.Asteroid = function(radius, color) {
		MovingObject.call(this, radius, color);
		this.color = color;
		this.radius = radius;
	}

	Function.prototype.inherits = function (superClass){
		function Surrogate(){};
		Surrogate.prototype = superClass.prototype;
		this.prototype = new Surrogate();
	}

	Asteroid.inherits(MovingObject);

	Asteroid.prototype.randomAsteroid = function(dimX, dimY) {
		//vel optional addition
		//we might need to floor this if we want integers...
		this.pos = [dimX * Math.random(), dimY * Math.random()];
		this.vel = this.randomVelocity(10);
	}

	Asteroid.prototype.randomVelocity = function (num) {
		return [(2 * num * Math.random() - num),
					 (2 * num * Math.random() - num)];
	};
})(this);
