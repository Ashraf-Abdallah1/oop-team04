import SceneLevel from './SceneLevel.js';
import Planet from '../Planet.js';

import OnPlanetScene from './OnPlanetScene.js';
import KeyListener from '../../KeyListener.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public override update(delta: number): void {
    super.update(delta);
  }

  /**
   * process user input
   * @param keyListener the keylisener
   *
   * */
  public override processInput(keyListener: KeyListener): void {
    super.processInput(keyListener);
    this.planets.forEach(((planet: Planet) => {
      if (this.player.isCollidingWithItem(planet)) {
        if(keyListener.isKeyDown(KeyListener.KEY_E)){
          this.nextScene = new OnPlanetScene(this.getCanvas());
        }
      }
    }));
  }
}
