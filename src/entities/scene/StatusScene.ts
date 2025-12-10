import Scene from './Scene.js';
import KeyListener from '../../KeyListener.js';
import MouseListener from '../../MouseListener.js';
import Player from '../Player.js';

export default abstract class StatusScene extends Scene {
  protected text: string | null = null;

  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, player);
  }

  public override update(delta: number): void {
  }

  public override processInput(
    keyListener: KeyListener,
    mouseListener: MouseListener
  ): void {
  }

}
