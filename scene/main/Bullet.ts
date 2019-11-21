import GuaImage from "../../gua_game/GuaImage";
import Scene from "./scene";
import { aCollideWithb } from "../../gua_game/utils";
import SceneEnd from "../end/scene_end";

class Bullet extends GuaImage {
  speed: number;
  type: "player" | "enemy";
  alive: boolean;
  constructor(game, type) {
    super(game, "bullet");
    this.type = type;
    this.speed = type === "player" ? -6 : 5;
  }

  update() {
    this.y += this.speed;
    console.log("butt update");

    if (this.y < 0) {
      this.alive = false;
    }

    if (this.type === "player") {
      // 判断与敌机碰撞
      const scene = this.game.scene as Scene;
      const enemies = scene.enemies || [];
      enemies.forEach(enemy => {
        if (aCollideWithb(this, enemy)) {
          enemy.boom();
          this.alive = false;
        }
      });
      // 判断与敌方子弹相撞
      const enemyBullets = scene.elements.filter(
        i => i.name === "bullet" && i.type === "enemy"
      );
      enemyBullets.forEach(eb => {
        if (aCollideWithb(this, eb)) {
          eb.alive = false;
          this.alive = false;
        }
      });
    } else {
      // 判断与玩家相撞
      const scene = this.game.scene as Scene;
      const player = scene.player;
      try {
        if (aCollideWithb(this, player)) {
          scene.fail()
        }
      } catch (error) {}
    }
  }
}

export default Bullet;
