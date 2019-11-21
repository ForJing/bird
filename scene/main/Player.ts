import GuaGame from "../../gua_game/GuaGame";
import GuaImage from "../../gua_game/GuaImage";
import Bullet from "./Bullet";

const canvasWidth = 400;
const canvasHeight = 600;

class Player extends GuaImage {
  speed: number;
  cooldown: number;

  constructor(game: GuaGame) {
    super(game, "player");
    this.speed = 10;
    this.w = 39;
    this.h = 46;
    this.cooldown = 0;
  }

  fire() {
    if (this.cooldown === 0) {
      this.cooldown = 6;
      const x = this.x + this.w / 2;
      const y = this.y - 5;
      const b = new Bullet(this.game, "player");
      b.x = x;
      b.y = y;
      this.game.scene.addElement(b);
    }
  }

  update() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  // collide(ball: Ball) {
  //   return aCollideWithb(this, ball);
  // }
}

export default Player;
