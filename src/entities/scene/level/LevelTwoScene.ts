import KeyListener from '../../../input/KeyListener.js';
import SceneLevel from './SceneLevel.js';
import Player from '../../movingItems/Player.js';
import Alien from '../../Alien.js';

export default class LevelTwoScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
  }

  /**
   * clear next scene
   */
  public override clearScene(): void {
    this.nextScene = null;
  }

  /**
   * update method
   * @param delta time elapsed
   */
  public override update(delta: number): void {
    super.update(delta);
  }

  /**
   * process user input
   * @param keyListener the keylisener
   * @returns the next scene
   * */
  public override processInput(keyListener: KeyListener): void {
    super.processInput(keyListener);
  }
}
