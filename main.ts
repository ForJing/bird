import GuaGame from "./gua_game/GuaGame";
import SceneTitle from "./scene/title/scene_title";
import "./style.scss";
import { loadImages } from "./gua_game/utils";
import Scene from "./scene/main/scene";

const log = console.log.bind(this);

async function __main() {
  const images = {
    bird: require("./images/bird.png"),
    city: require("./images/city.png"),
    ground: require("./images/ground.png"),
    pipe: require("./images/pipe.png"),
    tap: require("./images/tap.png")
  };

  const imgs = await loadImages(images);
  const game = new GuaGame(30, imgs);
  const scene = new Scene(game);
  game.scene = scene;

  // let score = 0;

  // window.addEventListener("keydown", e => {
  //   if (e.key === "p") {
  //     game.pause();
  //   }
  // });

  game.run();
}

__main();
