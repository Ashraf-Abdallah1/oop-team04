import Scene from './Scene.js';
import KeyListener from '../../KeyListener.js';
import MouseListener from '../../MouseListener.js';

export default abstract class StatusScene extends Scene {
  protected text: string | null = null;

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
