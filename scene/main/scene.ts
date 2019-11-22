import GuaAnimation from "../../gua_game/GuaAnimation";
import GuaGame from "../../gua_game/GuaGame";
import GuaImage from "../../gua_game/GuaImage";
import GuaScene from "../../gua_game/GuaScene";
import SceneEnd from "../end/scene_end";
import Pipes from "./Pipes";

class Scene extends GuaScene {
  bg: GuaImage;
  game: GuaGame;
  bird: any;
  grounds: any[];
  skipCount: number;
  pipes: Pipes;
  constructor(game: GuaGame) {
    super(game);
    this.setup();
    this.setupInputs();
  }

  setup() {
    const game = this.game;
    this.skipCount = 5;

    this.bg = new GuaImage(game, "bg", 400, 600);
    this.addElement(this.bg);

    // 加入水管
    this.pipes = new Pipes(game);
    this.addElement(this.pipes);

    // 循环地面
    this.grounds = [];

    const g = new GuaImage(game, "ground");
    const g2 = new GuaImage(game, "ground");
    g.y = 500;
    g2.y = 500;
    g2.x = 360;
    this.grounds.push(g);
    this.grounds.push(g2);
    this.addElement(g);
    this.addElement(g2);

    this.bird = new GuaAnimation(game, "bird");
    this.bird.x = 100;
    this.bird.y = 400;
    this.addElement(this.bird);

    // const ps = new GuaParticalSystem(game);
    // this.addElement(ps);
  }

  setupInputs() {
    const g = this.game;
    const b = this.bird;

    g.registerAction("a", () => {
      b.flipX = true;
      b.move(-5);
    });

    g.registerAction("d", () => {
      b.flipX = false;
      b.move(5);
    });

    g.registerAction("j", () => {
      b.vy = -10;
      b.rotation = -(45 * Math.PI) / 180;
    });
  }

  // draw() {}

  update() {
    super.update();
    this.skipCount--;
    let offset = -5;
    if (this.skipCount === 0) {
      offset = 20;
      this.skipCount = 5;
    }
    for (let g of this.grounds) {
      g.x += offset;
    }
    // for (let i = 0; i < this.grounds.length; i++) {

    // }
  }

  fail() {
    this.game.scene = new SceneEnd(this.game);
  }
}

export default Scene;
