(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var MovingObject = Asteroids.MovingObject;

	var Asteroid = Asteroids.Asteroid = function(radius, color) {
		// MovingObject.call(this, radius, color);
		this.color = color;
		this.radius = radius;
		this.angle = 0;
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

	Asteroid.prototype.splitSmaller = function(position) {
		this.pos = position;
		this.vel = this.randomVelocity(1);
	}

	Asteroid.prototype.randomVelocity = function (num) {
		return [(4 * num * Math.random() - num),
					 (4 * num * Math.random() - num)];
	};

	Asteroid.prototype.draw = function (ctx) {
    this.angle += .5;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle * Math.PI / 180)
		if (this.radius == 65) {
			ctx.drawImage(asteroidOneThirty, -(asteroidOneThirty.width/2), -(asteroidOneThirty.height/2));
		} else if (this.radius == 40) {
			ctx.drawImage(asteroidEighty, -(asteroidEighty.width/2), -(asteroidEighty.height/2));
			} else {
			ctx.drawImage(asteroidTwenty, -(asteroidTwenty.width/2), -(asteroidTwenty.height/2));
		}
		ctx.restore();
	}
})(this);
