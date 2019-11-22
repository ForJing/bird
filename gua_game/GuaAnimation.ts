import GuaGame from "./GuaGame";
import Scene from "../scene/main/scene";
import SceneEnd from "../scene/end/scene_end";

class GuaAnimation {
  game: GuaGame;
  name: string;
  frames: any[];
  frameIndex: number;
  frameCount: number;
  texture: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean = true;
  flipX: boolean = false;
  gy: number;
  vy: number;
  rotation: number;
  constructor(game: GuaGame, name) {
    this.game = game;
    this.name = name;
    this.frames = [];
    this.frameIndex = 0;
    this.frameCount = 5;
    this.vy = 0;
    this.gy = 2;
    this.rotation = (45 * Math.PI) / 180;

    for (let i = 1; i <= 3; i++) {
      this.frames.push(game.textureByName(`bird${i}`));
    }

    this.texture = this.frames[0];
    this.w = this.texture.width;
    this.h = this.texture.height;
  }

  draw() {
    const context = this.game.context;

    if (this.flipX) {
      context.save();
      const x = this.x + this.w / 2;
      const y = this.y + this.h / 2;
      // context.rotate(this.rotation);

      context.translate(x, y);
      context.scale(-1, 1);
      context.rotate(this.rotation);

      context.drawImage(this.texture, -this.w / 2, -this.h / 2);
      context.restore();
    } else {
      context.save();

      const x = this.x + this.w / 2;
      const y = this.y + this.h / 2;
      context.translate(x, y);
      context.rotate(this.rotation);

      context.drawImage(this.texture, -this.w / 2, -this.h / 2);
      context.restore();
    }
  }

  move(v) {
    this.x += v;

    if (this.x + this.w >= 400) {
      this.x = 400 - this.w;
    }
    if (this.x <= 0) {
      this.x = 0;
    }
  }

  update() {
    this.frameCount--;
    if (this.frameCount === 0) {
      this.frameCount = 5;
      this.frameIndex++;
      this.frameIndex = this.frameIndex % 3;
      this.texture = this.frames[this.frameIndex];
    }

    const scene = this.game.scene as Scene;

    if (this.rotation < (90 * Math.PI) / 180) {
      this.rotation += 0.1;
    }
    this.vy += this.gy * 0.5;
    this.y += this.vy;
    if (this.y >= 475) {
      scene.fail();
      this.y = 475;
    }
    if (this.y < 0) {
      this.y = 0;
    }

    const pipes = scene.pipes.pipes;

    for (const p of pipes) {
      if (this.x + this.w > p.x && this.x < p.x + p.w) {
        if (this.y + this.h > p.y && this.y + this.h < p.y + p.h) {
          scene.fail();
        }
      }
    }
  }
}

export default GuaAnimation;
