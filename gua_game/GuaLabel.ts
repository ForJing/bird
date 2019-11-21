import GuaGame from "./GuaGame";

class GuaLabel {
  game: GuaGame;
  text: string;
  x: number;
  y: number;
  constructor(game: GuaGame, text: "string", x, y) {
    this.game = game;
    this.text = text;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.game.context.fillText(this.text, this.x, this.y);
  }
  update() {}
}

export default GuaLabel;
