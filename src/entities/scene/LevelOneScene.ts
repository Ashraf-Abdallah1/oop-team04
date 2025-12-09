import SceneLevel from './SceneLevel.js';
import Planet from '../Planet.js';

import OnPlanetScene from './OnPlanetScene.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public override update(delta: number): void {
    super.update(delta);
    this.planets.forEach(((planet: Planet) => {
      if (this.player.isCollidingWithItem(planet)) {
        this.nextScene = new OnPlanetScene(this.getCanvas());
      }
    }));
  }
}
