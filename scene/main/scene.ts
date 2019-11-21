import GuaGame from "../../gua_game/GuaGame";
import GuaImage from "../../gua_game/GuaImage";
import GuaScene from "../../gua_game/GuaScene";
import Player from "./Player";
import Enemy from "./Enemy";
import GuaParticalSystem from "./GuaParticalSystem";
import SceneEnd from "../end/scene_end";

class Scene extends GuaScene {
  bg: GuaImage;
  game: GuaGame;
  player: Player;
  elements: Array<any>;
  cloud: GuaImage;
  numberOfEnemies: number;
  enemies: Array<Enemy> = [];
  constructor(game: GuaGame) {
    super(game);
    this.setup();
    this.setupInputs();
  }

  setup() {
    const game = this.game;
    this.bg = new GuaImage(game, "sky");
    this.numberOfEnemies = 10;
    this.player = new Player(game);
    this.cloud = new GuaImage(game, "cloud", 150, 150);
    this.player.x = 100;
    this.player.y = 450;
    this.addElement(this.bg);
    this.addElement(this.cloud);
    this.addEnemies();
    this.addElement(this.player);

    // const ps = new GuaParticalSystem(game);
    // this.addElement(ps);
  }

  setupInputs() {
    const g = this.game;
    const p = this.player;

    g.registerAction("a", () => {
      p.moveLeft();
    });

    g.registerAction("d", () => {
      p.moveRight();
    });

    g.registerAction("w", () => {
      p.moveUp();
    });

    g.registerAction("s", () => {
      p.moveDown();
    });

    g.registerAction("j", () => {
      p.fire();
    });
  }

  addEnemies() {
    const es = [];
    for (let i = 0; i < this.numberOfEnemies; i++) {
      const enemy = new Enemy(this.game);
      es.push(enemy);
      this.addElement(enemy);
    }
    this.enemies = es;
  }

  // draw() {}

  update() {
    this.cloud.y += 2;
    super.update();
    this.enemies = this.enemies.filter(i => i.alive);
  }

  fail() {
    this.elements = [];
    this.game.scene = new SceneEnd(this.game);
  }
}

export default Scene;
