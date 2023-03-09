export default class Player {
  constructor(x, y, health, bulletController) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 1;
    this.shooting = true;

    // document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  takeDamage(damage) {
    const health = document.getElementById("health");
    health.value -= damage;
    this.health -= damage;
  }

  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // const image = new Image();
    // image.src = "./character.png";
    // ctx.drawImage(image, 0, 0);

    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    this.shooting && this.shoot();
  }

  shoot() {
    // if (this.shootPressed) {
    const speed = 2;
    const delay = 70;
    const damage = 1;
    const bulletX = window.screen.width / 1.1;
    const bulletY = window.screen.height / 1.93;
    this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
    // }
  }

  stop() {
    this.shooting = false;
    this.bulletController.stop();
  }

  move() {
    if (this.downPressed) {
      this.y += this.speed;
    }
    if (this.upPressed) {
      this.y -= this.speed;
    }
    if (this.leftPressed) {
      this.x -= this.speed;
    }

    if (this.rightPressed) {
      this.x += this.speed;
    }
  }

  keydown = (e) => {
    this.key = e.code;
    // if (e.code === "ArrowUp") {
    //   this.upPressed = true;
    // }
    // if (e.code === "ArrowDown") {
    //   this.downPressed = true;
    // }
    // if (e.code === "ArrowLeft") {
    //   this.leftPressed = true;
    // }
    // if (e.code === "ArrowRight") {
    //   this.rightPressed = true;
    // }
    // if (e.code === "Space") {
    //   this.shootPressed = true;
    // }
  };

  keyup = (e) => {
    this.key = e.code;

    this.bulletController.removeCorrectBullet(e.code);
    // if (e.code === "ArrowUp") {
    //   this.upPressed = false;
    // }
    // if (e.code === "ArrowDown") {
    //   this.downPressed = false;
    // }
    // if (e.code === "ArrowLeft") {
    //   this.leftPressed = false;
    // }
    // if (e.code === "ArrowRight") {
    //   this.rightPressed = false;
    // }
    // if (e.code === "Space") {
    //   this.shootPressed = false;
    // }
  };
}
