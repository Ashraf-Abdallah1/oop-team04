import StatusScene from '../StatusScene.js';
import KeyListener from '../../../KeyListener.js';
import MouseListener from '../../../MouseListener.js';
import LevelOneScene from '../LevelOneScene.js';
import Player from '../../Player.js';
import CanvasRenderer from '../../../CanvasRenderer.js';

export default class StartScene extends StatusScene {
  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, player );
  }

  /**
   * update method
   * @param delta elapsed time
   * @returns Scene or null
   */
  public override update(delta: number): void {
    super.update(delta);
  }

  /**
   * See if we have pressed the button on the screen
   * @param keyListener keyListener
   * @param mouseListener keyListener
   * @returns Returns the Scene
   */
  public override processInput(
    keyListener: KeyListener,
    mouseListener: MouseListener): void {
    const mousePos: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const buttonX: number = this.getCanvas().width / 2 - 75;
    const buttonY: number = this.getCanvas().height / 2 - 25;
    const buttonWidth: number = 150;
    const buttonHeight: number = 50;

    const insideX: boolean = mousePos.x >= buttonX && mousePos.x <= buttonX + buttonWidth;
    const insideY: boolean = mousePos.y >= buttonY && mousePos.y <= buttonY + buttonHeight;
    const insideButton: boolean = insideX && insideY;

    if (clicked && insideButton) {
      this.nextScene = new LevelOneScene(this.getCanvas(), this.player);
    }
  }

  /**
   * Rendering for the button
   * @param canvas Rendering the canvas for the button
   * @returns return de button
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawButton(canvas, canvas.width / 2 - 75, canvas.height / 2 - 25, 150, 50, 'START', '#ffffffff', '#000000ff'
    );
  }
}
