import KeyListener from '../../KeyListener.js';
import SceneLevel from './SceneLevel.js';
import Planet from '../Planet.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.makePlanets();
  }

  public override update(delta: number): void {
  }

  public override processInput(keyListener: KeyListener): void {
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public render(canvas: HTMLCanvasElement): void {
    this.planets.forEach(((planet: Planet) => {
      planet.render(canvas);
    }));
  }
}
