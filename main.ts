import GuaGame from "./gua_game/GuaGame";
import SceneTitle from "./scene/title/scene_title";
import "./style.scss";
import { loadImages } from "./gua_game/utils";
import Scene from "./scene/main/scene";

const log = console.log.bind(this);

async function __main() {
  const images = {
    sky: require("./images/sky.png"),
    player: require("./images/player.png"),
    cloud: require("./images/cloud.png"),
    enemy0: require("./images/enemy0.png"),
    enemy1: require("./images/enemy1.png"),
    enemy2: require("./images/enemy2.png"),
    enemy3: require("./images/enemy3.png"),
    enemy4: require("./images/enemy4.png"),
    bullet: require("./images/bullet.png"),
    fire: require("./images/fire.png")
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
