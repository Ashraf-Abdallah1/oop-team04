import StatusScene from '../StatusScene.js';
import Scene from '../Scene.js';
import KeyListener from '../../../KeyListener.js';
export default class StartScene extends StatusScene {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public override update(delta: number): Scene | null {
    return null;
  }

  public override processInput(keyListener: KeyListener): void {

  }
}