(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {})

  var MovingObject = Asteroids.MovingObject;

  var Ship = Asteroids.Ship = function (pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.vel = [0,0];
    this.direction = 0;
    this.shipCharged = true;
  };

  Ship.inherits(MovingObject);

  Ship.prototype.power = function (impulse) {
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
    this.shipCharged = false;
    setTimeout(function () {
      ship.shipCharged = true
    }, 300) 
      
    var bulletPos = [];
    bulletPos[0] = ship.pos[0] //+ 10 * -Math.cos(this.direction)
    bulletPos[1] = ship.pos[1] //+ 10 * Math.sin(this.direction)

    var velX = .8 * Math.sin(this.direction * Math.PI / 180);
    var velY = .8 * -Math.cos(this.direction * Math.PI / 180);

    if ((ship.vel[0] === 0 && ship.vel[1] === 0)) {
      var vel = [20 * (ship.vel[0] + velX), 20 * (ship.vel[1] + velY)];   
      return new Asteroids.Bullet(ship.pos, vel, 2, "blue", game);
    }

    // var speed = Math.sqrt(ship.vel[0] * ship.vel[0] + ship.vel[1] * ship.vel[1]);

    // var vel = [5 * (ship.vel[0] + velX) / speed, 5 * (ship.vel[1] + velY) / speed];   

    // return new Asteroids.Bullet(ship.pos, vel, 3, "green", game);
    var vel = [20 * (velX), 20 * (velY)];   

    // var vel = [5 * (ship.vel[0] + velX) / speed, 5 * (ship.vel[1] + velY) / speed];   

    // if (!(ship.vel[0] === 0 && ship.vel[1] === 0)) {
    //  var speed = Math.sqrt(ship.vel[0] * ship.vel[0] + ship.vel[1] * ship.vel[1]);
    //  var vel = [5 * ship.vel[0] / speed, 5 * ship.vel[1] / speed];
    //  return new Asteroids.Bullet(ship.pos, vel, 10, "green", game);
    // }

    
    return new Asteroids.Bullet(ship.pos, vel, 2, "blue", game);
  };

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction * Math.PI / 180);
    ctx.drawImage(shipImage, -(shipImage.width/2), -(shipImage.height/2));
    ctx.restore();
  }

})(this);
