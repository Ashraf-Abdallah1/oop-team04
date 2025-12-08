import KeyListener from '../../KeyListener.js';
import SceneLevel from './SceneLevel.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public override update(delta: number): void {
  }

  public override processInput(keyListener: KeyListener): void {
  }
}
