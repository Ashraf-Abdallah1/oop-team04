import KeyListener from '../../KeyListener.js';
import Scene from './Scene.js';
import CanvasRenderer from '../../CanvasRenderer.js';

export default class OnPlanetScene extends Scene {
  /**
   * update the scene
   *  @param delta time in ms elapsed from the GameLoop
   * */
  public override update(delta: number): void {

  }

  /**
   * process input for the scene
   *  @param keyListener the keylistener to get input from
   * */
  public override processInput(keyListener: KeyListener): void {
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.writeText(canvas, 'Je bent aan de Planet', this.getCanvas().width / 2 + 50, 300, 'center', 'sans-serif', 100);
  }
}
