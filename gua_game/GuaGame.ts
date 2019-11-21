import { Keydowns } from "../types";
import GuaImage from "./GuaImage";
import GuaScene from "./GuaScene";

class GuaGame {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  actions: any;
  keydowns: Keydowns;
  fps: number;
  paused: boolean;
  images: any;
  scene: GuaScene;

  constructor(fps = 30, images = {}) {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const context = canvas.getContext("2d");

    this.canvas = canvas;
    this.context = context;
    this.actions = {};
    this.keydowns = {};
    this.fps = fps;

    this.paused = false;
    this.images = images;
  }

  pause() {
    this.paused = !this.paused;
  }

  textureByName(name) {
    return this.images[name];
  }

  setTimer() {
    const that = this;
    function loop() {
      setTimeout(() => {
        // events
        const keys = Object.keys(that.actions);
        keys.forEach(key => {
          const action = that.actions[key];
          if (that.keydowns[key]) {
            action();
          }
        });

        // update
        that.update();

        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        // draw
        that.draw();

        loop();
      }, 1000 / that.fps);
    }
    loop();
  }

  setUpListeners() {
    window.addEventListener("keydown", event => {
      this.keydowns[event.key] = true;
    });
    window.addEventListener("keyup", event => {
      this.keydowns[event.key] = false;
    });
  }

  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  draw() {
    this.scene.draw();
  }

  update() {
    this.scene.update();
  }

  drawImage(guaImage: GuaImage) {
    this.context.drawImage(
      guaImage.texture,
      guaImage.x,
      guaImage.y,
      guaImage.w,
      guaImage.h
    );
  }

  run() {
    this.setUpListeners();
    this.setTimer();
  }
}

export default GuaGame;
