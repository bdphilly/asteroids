(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var MovingObject = Asteroids.MovingObject;

	var Ship = Asteroids.Ship = function(pos, radius, color) {
		this.pos = pos;
		this.radius = radius;
		this.color = color;
		this.vel = [0,0];
		this.direction = 0;
	}

	// Function.prototype.inherits = function (superClass){
	// 	function Surrogate(){};
	// 	Surrogate.prototype = superClass.prototype;
	// 	this.prototype = new Surrogate();
	// }

	Ship.inherits(MovingObject);

	Ship.prototype.power = function (impulse) {
		// this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
		// var newVel = this.vel;
  //   newVel[0] += (impulse / 10) * Math.cos((this.direction / 10) * Math.PI);
  //   newVel[1] += (impulse / 10) * Math.sin((this.direction / 10) * Math.PI);
  //   this.vel = newVel;

    var velX = impulse / 10 * Math.sin(this.direction * Math.PI / 180);
    var velY = impulse / 10 * -Math.cos(this.direction * Math.PI / 180);
    this.vel[0] += velX;
    this.vel[1] += velY;


	};


	Ship.prototype.turn = function (amount) {
		this.direction += amount;
	};

	Ship.prototype.fireBullet = function(game) {
		var ship = this;
		if (!(ship.vel[0] === 0 && ship.vel[1] === 0)) {
			var speed = Math.sqrt(ship.vel[0] * ship.vel[0] + ship.vel[1] * ship.vel[1]);
			var vel = [5 * ship.vel[0] / speed, 5 * ship.vel[1] / speed];
			return new Asteroids.Bullet(ship.pos, vel, 10, "green", game);
		}
	};

	Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    // ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction * Math.PI / 180);
		ctx.drawImage(shipImage, -(shipImage.width/2), -(shipImage.height/2));
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
