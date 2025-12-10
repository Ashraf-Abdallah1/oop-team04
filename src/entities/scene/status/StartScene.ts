import StatusScene from '../StatusScene.js';
import Scene from '../Scene.js';
import KeyListener from '../../../KeyListener.js';
import Player from '../../Player.js';

export default class StartScene extends StatusScene {
  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, player );
  }

  public override update(delta: number): Scene | null {
    return null;
  }

  public override processInput(keyListener: KeyListener): void {

  }

  public override render(canvas: HTMLCanvasElement): void {

  }
}
