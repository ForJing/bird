import GuaGame from "./GuaGame";

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
  constructor(game: GuaGame, name) {
    this.game = game;
    this.name = name;
    this.frames = [];
    this.frameIndex = 0;
    this.frameCount = 5;

    for (let i = 1; i <= 3; i++) {
      this.frames.push(game.textureByName(`bird${i}`));
    }

    this.texture = this.frames[0];
  }

  getFrame() {
    const frame = this.frames[this.frameIndex] as HTMLImageElement;
    this.w = frame.width;
    this.h = frame.height;
    this.texture = frame;
    return frame;
  }

  draw() {
    const context = this.game.context;

    if (this.flipX) {
      context.save();
      const x = this.x + this.w / 2;
      const y = this.y + this.h / 2;
      context.translate(x, y);
      context.scale(-1, 1);
      context.drawImage(this.texture, -this.w / 2, -this.h / 2);
      context.restore();
    } else {
      context.save();

      const x = this.x + this.w / 2;
      const y = this.y + this.h / 2;
      context.translate(x, y);
      context.drawImage(this.texture, -this.w / 2, -this.h / 2);
      context.restore();
    }
  }

  move(v) {
    this.x += v;
  }

  update() {
    this.frameCount--;
    if (this.frameCount === 0) {
      this.frameCount = 5;
      this.frameIndex++;
      this.frameIndex = this.frameIndex % 3;
      this.getFrame();
    }
  }
}

export default GuaAnimation;
