import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  shoot(x, y, speed, damage, delay) {
    if (this.timerTillNextBullet <= 0) {
      const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const random = this.getRndInteger(0, 25);
      this.bullets.push(new Bullet(x, y, speed, damage, char.charAt(random)));

      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }

  stop = () => {
    this.bullets = [];
  };

  removeCorrectBullet = (code) => {
    const key = code.charAt(code.length - 1);

    const Bullet = this.bullets[0];

    if (key == Bullet.character) this.bullets.splice(0, 1);
  };

  draw(ctx) {
    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  collideWith(sprite) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }

  isBulletOffScreen(bullet) {
    return bullet.y <= -bullet.height;
  }
}
