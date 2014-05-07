var MovingObject = require('./moving_object');

(function(root) {
	var Asteroid = root.Asteroid = (root.Asteroid || {});

	Function.prototype.inherits = function (superClass){
		function Surrogate(){};
		Surrogate.prototype = superClass.prototype;
		this.prototype = new Surrogate();
	}

	Asteroid.inherits(MovingObject);


	//function MovingObject(pos, vel, radius, color) {
	function Asteroid (radius, color){
		this.COLOR = color;
		this.RADIUS = radius
	}

	Asteroid.prototype.randomAsteroid = function(dimX, dimY) {

		//we might need to floor this if we want integers...
		this.pos = [dimX * Math.random(), dimY * Math.random()];

		this.velocity = Math.random();
	}

	Asteroid.prototype.randomVelocity = function () {

	};


})(this);