import GuaGame from "../../gua_game/GuaGame";
import GuaImage from "../../gua_game/GuaImage";
import { randomBetween } from "../../gua_game/utils";

class Pipes {
  game: GuaGame;
  pipes: any[];
  pipeSpace: number = 150;
  pipeDistance: number = 200; // 横向距离
  columnsOfPipes: number = 3;
  alive = true;
  name: string;

  constructor(game: GuaGame) {
    this.game = game;
    this.pipes = [];
    this.name = "pipes";
    this.alive = true;

    for (let i = 0; i < this.columnsOfPipes; i++) {
      const p1 = new GuaImage(game, "pipe");
      p1.flipY = true;
      p1.x = 500 + i * this.pipeDistance;
      const p2 = new GuaImage(game, "pipe");
      p2.x = 500 + i * this.pipeDistance;
      this.resetPipesPosition(p1, p2);
      this.pipes.push(p1);
      this.pipes.push(p2);
    }
  }

  resetPipesPosition(p1, p2) {
    p1.y = randomBetween(-200, 0);
    p2.y = p1.y + p1.h + this.pipeSpace;
  }

  update() {
    for (const p of this.pipes) {
      p.x -= 5;
      if (p.x < -100) {
        p.x += this.pipeDistance * this.columnsOfPipes;
      }
    }
  }

  draw() {
    const context = this.game.context;
    for (const p of this.pipes) {
      context.save();

      const x = p.x + p.w / 2;
      const y = p.y + p.h / 2;
      context.translate(x, y);
      if (p.flipY) {
        context.scale(1, -1);
      }

      context.drawImage(p.texture, -p.w / 2, -p.h / 2);

      context.restore();
    }
  }
}

export default Pipes;
