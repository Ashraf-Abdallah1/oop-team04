import KeyListener from '../../KeyListener.js';
import MouseListener from '../../MouseListener.js';
import Scene from './Scene.js';
import SceneLevel from './SceneLevel.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public override update(delta: number): Scene | null {
    return null;
  }

  public override processInput(
    keyListener: KeyListener,
    mouseListener: MouseListener
  ): Scene | null {
    return null;
  }
}
