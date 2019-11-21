import GuaImage from "../../gua_game/GuaImage";
import GuaGame from "../../gua_game/GuaGame";
import { randomBetween, aCollideWithb } from "../../gua_game/utils";
import Bullet from "./Bullet";
import GuaParticalSystem from "./GuaParticalSystem";
import Scene from "./scene";

class Enemy extends GuaImage {
  speed: number;
  cooldown: number;

  constructor(game: GuaGame) {
    const t = randomBetween(0, 4);
    super(game, `enemy${t}`);
    this.setup();
  }

  setup() {
    this.speed = randomBetween(1, 3);
    this.x = randomBetween(0, 350);
    this.y = -randomBetween(0, 200);
    this.cooldown = 0;
  }

  boom() {
    console.log("boom");
    const ps = new GuaParticalSystem(this.game);
    ps.x = this.x;
    ps.y = this.y;
    this.game.scene.addElement(ps);
    this.alive = false;
  }

  fire() {
    if (this.cooldown === 0) {
      this.cooldown = 30;
      const x = this.x + this.w / 2;
      const y = this.y + 5;
      const b = new Bullet(this.game, "enemy");
      b.x = x;
      b.y = y;
      this.game.scene.addElement(b);
    }
  }

  update() {
    this.y += this.speed;
    const scene = this.game.scene as Scene;
    const player = scene.player;

    if (aCollideWithb(this, player)) {
      scene.fail();
    }

    if (this.y + this.h > 0) {
      this.fire();
      this.cooldown--;
    }
    if (this.y > 600) {
      this.setup();
    }
  }
}

export default Enemy;
