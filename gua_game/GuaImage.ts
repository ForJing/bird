import GuaGame from "./GuaGame";

class GuaImage {
  texture: HTMLImageElement;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean = true;
  game: GuaGame;
  flipY?;
  constructor(game: GuaGame, name: string, w?, h?) {
    this.texture = game.textureByName(name);
    this.x = 0;
    this.y = 0;
    this.w = w || this.texture.width;
    this.h = h || this.texture.height;
    this.game = game;
    this.name = name;
  }

  draw() {
    this.game.drawImage(this);
  }
}

export default GuaImage;
