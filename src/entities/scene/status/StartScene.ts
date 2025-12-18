import StatusScene from './StatusScene.js';
import KeyListener from '../../../KeyListener.js';
import MouseListener from '../../../MouseListener.js';
import Player from '../../Player.js';
import CanvasRenderer from '../../../CanvasRenderer.js';
import InstructionScene from '../InstructionScene.js';
import Alien from '../../Alien.js';

export default class StartScene extends StatusScene {
  private buttonX: number;

  private buttonY: number;

  private buttonWidth: number = 200;

  private buttonHeight: number = 75;

  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.buttonX = canvas.width / 2 - this.buttonWidth / 2;
    this.buttonY = canvas.height / 2 - this.buttonHeight / 2;
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
    this.checkButtonClick(mouseListener);
  }

  /**
   * check if button clicked
   *
   * @param mouseListener MouseListener to listen to the mouse
   *
   * */
  public checkButtonClick(mouseListener: MouseListener): void {
    const mousePosition: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const insideX: boolean = mousePosition.x >=
      this.buttonX && mousePosition.x <= this.buttonX + this.buttonWidth;
    const insideY: boolean = mousePosition.y >=
      this.buttonY && mousePosition.y <= this.buttonY + this.buttonHeight;

    const insideButton: boolean = insideX && insideY;

    if (clicked && insideButton) {
      this.nextScene = new InstructionScene(this.getCanvas(), this.player, this.alien);
    }
  }

  /**
   * Rendering for the button
   * @param canvas Rendering the canvas for the button
   * @returns return de button
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawButton(
      canvas,
      this.buttonX,
      this.buttonY,
      this.buttonWidth,
      this.buttonHeight,
      'START',
      '#ffffffff',
      '#000000ff'
    );
    CanvasRenderer.writeText(
      canvas,
      'Space Game',
      canvas.width / 2,
      canvas.height / 2 - 90,
      'center',
      'sans-serif',
      50,
      'white'
    );
  }
}
