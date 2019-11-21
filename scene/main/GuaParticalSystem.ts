import GuaGame from "../../gua_game/GuaGame";
import GuaImage from "../../gua_game/GuaImage";
import { randomBetween } from "../../gua_game/utils";

class GuaParticalSystem {
  game: GuaGame;
  x: number;
  y: number;
  numberOfParticles: number;
  particles: GuaParticle[];
  duration = 30;
  alive: boolean;
  constructor(game: GuaGame) {
    this.game = game;
    this.setup();
  }

  setup() {
    this.x = 150;
    this.y = 150;
    this.numberOfParticles = 20;
    this.particles = [];
    this.alive = true;
  }

  update() {
    this.duration--;
    if (this.duration < 0) {
      this.particles.forEach(i => (i.alive = false));
      this.alive = false;
    }
    // 添加小火花
    if (this.particles.length < this.numberOfParticles) {
      const p = new GuaParticle(this.game);
      var s = 2;
      const vx = randomBetween(-s, s);
      const vy = randomBetween(-s, s);

      p.init(this.x, this.y, vx, vy);
      this.particles.push(p);
    }
    // 更新小火花

    for (var p of this.particles) {
      p.update();
    }

    // 删除
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    if (this.alive) {
      for (var p of this.particles) {
        p.draw();
      }
    }
  }
}

class GuaParticle extends GuaImage {
  vx: number;
  vy: number;
  life: number;
  constructor(game) {
    super(game, "fire");
    this.setup();
  }

  setup() {
    this.life = 10;
  }

  init(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.life--;
    this.x += this.vx;
    this.y += this.vy;
    const factor = 0.01;
    this.vx += factor * this.vx;
    this.vy += factor * this.vy;
  }
}

export default GuaParticalSystem;
