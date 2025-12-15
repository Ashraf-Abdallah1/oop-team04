import KeyListener from "../../KeyListener.js";
import MouseListener from "../../MouseListener.js";
import SceneLevel from "./SceneLevel.js";
import Planet from "../Planet.js";
import OnPlanetScene from "./OnPlanetScene.js";
import Player from "../Player.js";
import Alien from '../Alien.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
  }

  /**
   * clear next scene
   */
  public clearScene(): void {
    this.nextScene = null;
  }

  /**
   * update method
   * @param delta time elapsed
   */
  public override update(delta: number): void {
    super.update(delta);
  }

  /**
   * process user input
   * @param keyListener the keylisener
   * @param mouseListener the mouseListener
   * @returns the next scene
   * */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    super.processInput(keyListener, mouseListener);

    const closestPlanetData: { planet: Planet | null; distance: number } = this.getClosestPlanet();
    const closestPlanet: Planet | null = closestPlanetData.planet;
    const closestDistance: number = closestPlanetData.distance;

    if (closestPlanet) {
      const playerRadius: number = Math.max(this.player.getWidth(), this.player.getHeight()) / 2;
      const planetRadius: number = closestPlanet.getHeight() / 2;
      const collisionDistance: number = closestDistance -
      (playerRadius + 67 /** SIX SEVEN */ + planetRadius);

      if (collisionDistance <= planetRadius && keyListener.isKeyDown(KeyListener.KEY_E)) {
        if (this.player.getPlanetToGo()?.toString() === closestPlanet.getName().toString()) {
          this.player.setOnCorrectPlanet(true);
          this.nextScene = new OnPlanetScene(this.getCanvas(),
            this.player, closestPlanet, this.alien, this);
        } else {
          this.nextScene = new OnPlanetScene(this.getCanvas(),
            this.player, closestPlanet, this.alien, this);
          this.player.setOnCorrectPlanet(false);
        }
      }
    }
  }
}
