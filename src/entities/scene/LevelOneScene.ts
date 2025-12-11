import KeyListener from '../../KeyListener.js';
import MouseListener from '../../MouseListener.js';
import SceneLevel from './SceneLevel.js';
import Planet from '../Planet.js';
import OnPlanetScene from './OnPlanetScene.js';
import Player from '../Player.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, player);
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
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener)
    : void {
    super.processInput(keyListener, mouseListener);
    this.planets.forEach(((planet: Planet) => {
      if (this.player.isCollidingWithItem(planet)) {
        if(keyListener.isKeyDown(KeyListener.KEY_E)){
          if(this.player.getPlanetToGo()?.toString() == planet.getName().toString()){
            this.player.setOnCorrectPlanet(true);
            this.nextScene = new OnPlanetScene(this.getCanvas(), this.player, planet);
          }else {
            this.nextScene = new OnPlanetScene(this.getCanvas(), this.player, planet);
            this.player.setOnCorrectPlanet(false);
          }
        }
      }
    }));
  }
}
