import GuaGame from "./gua_game/GuaGame";
import SceneTitle from "./scene/title/scene_title";
import "./style.scss";
import { loadImages } from "./gua_game/utils";
import Scene from "./scene/main/scene";

const log = console.log.bind(this);

async function __main() {
  const images = {
    bird1: require("./images/bird1.png"),
    bird2: require("./images/bird2.png"),
    bird3: require("./images/bird3.png"),
    bg: require("./images/bg.png"),
    ground: require("./images/ground.png"),
    pipe: require("./images/pipe.png"),
    tap: require("./images/tap.png")
  };

  const imgs = await loadImages(images);
  const game = new GuaGame(30, imgs);
  const scene = new SceneTitle(game);
  game.scene = scene;

  game.run();
}

__main();
