(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var MovingObject = Asteroids.MovingObject;

	var Asteroid = Asteroids.Asteroid = function(radius, color) {
		// MovingObject.call(this, radius, color);
		this.color = color;
		this.radius = radius;
	}

	// Function.prototype.inherits = function (superClass){
	// 	function Surrogate(){};
	// 	Surrogate.prototype = superClass.prototype;
	// 	this.prototype = new Surrogate();
	// }

	Asteroid.inherits(MovingObject);

	Asteroid.prototype.randomAsteroid = function(dimX, dimY) {
		//vel optional addition
		//we might need to floor this if we want integers...
		this.pos = [dimX * Math.random(), dimY * Math.random()];
		this.vel = this.randomVelocity(1);
	}

	Asteroid.prototype.randomVelocity = function (num) {
		return [(4 * num * Math.random() - num),
					 (4 * num * Math.random() - num)];
	};

	Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    // ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction * Math.PI / 180);
		ctx.drawImage(asteroidImage, -(shipImage.width/2), -(asteroidImage.height/2));
		// ctx.arc(
		// 	this.pos[0],
		// 	this.pos[1],
		// 	this.radius,
  //     ((this.direction / 10) + 0.15) * Math.PI,
  //     ((this.direction / 10) - 0.15) * Math.PI,
		// 	false
		// );
		// ctx.fill();
		ctx.restore();
	}
})(this);
