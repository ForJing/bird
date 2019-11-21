import GuaGame from "../../gua_game/GuaGame";
import Scene from "../main/scene";
import GuaScene from "../../gua_game/GuaScene";

class SceneTitle extends GuaScene {
  game: GuaGame;

  constructor(game: GuaGame) {
    super(game);
    game.registerAction("k", () => {
      game.scene = new Scene(game);
    });
  }

  draw() {
    const game = this.game;

    game.context.font = "16px Arial";
    game.context.fillText(`按 k 开始游戏`, 150, 150);
  }

  update() {}
}

export default SceneTitle;
