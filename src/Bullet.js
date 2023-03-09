export default class Bullet {
  constructor(x, y, speed, damage, character) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.character = character;

    this.width = 30;
    this.height = 35;
    this.color = "yellow";
    // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw(ctx) {
    this.x -= this.speed;
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    //Draw Text
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(
      this.character,
      this.x + this.width / 3.5,
      this.y + this.height / 1.5
    );
  }

  collideWith(sprite) {
    if (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    ) {
      sprite.takeDamage(this.damage);
      return true;
    }
    return false;
  }
}
