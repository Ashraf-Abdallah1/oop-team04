import StatusScene from './StatusScene.js';
import KeyListener from '../../../input/KeyListener.js';
import MouseListener from '../../../input/MouseListener.js';
import Player from '../../movingItems/Player.js';
import CanvasRenderer from '../../../rendering/CanvasRenderer.js';
import InstructionScene from '../InstructionScene.js';
import Alien from '../../Alien.js';

export default class StartScene extends StatusScene {
  private readonly startButton: HTMLImageElement = new Image();

  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.startButton = CanvasRenderer.loadNewImage('assets/sci-fi/buttons/Start.png');
  }

  /**
   * See if we have pressed the button on the screen
   * @param keyListener keyListener
   * @param mouseListener keyListener
   * @returns Returns the Scene
   */
  public override processInput(
    keyListener?: KeyListener,
    mouseListener?: MouseListener | undefined): void {
    if (mouseListener) {
      this.checkButtonClick(mouseListener);
    }
  }

  /**
   * check if button clicked
   *
   * @param mouseListener MouseListener to listen to the mouse
   *
   * */
  private checkButtonClick(mouseListener: MouseListener): void {
    const mousePosition: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();
    const canvas: HTMLCanvasElement = this.getCanvas();

    const insideButton: boolean = mousePosition.x >=
      (canvas.width / 2) - (this.startButton.width / 2) &&
      mousePosition.x <= (canvas.width / 2) + (this.startButton.width / 2) &&
      mousePosition.y >= (canvas.height / 2) - (this.startButton.height / 2) &&
      mousePosition.y <= (canvas.height / 2) + (this.startButton.height / 2);

    if (insideButton) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }

    if (clicked && insideButton) {
      canvas.style.cursor = 'default';
      this.nextScene = new InstructionScene(this.getCanvas(), this.player, this.alien);
    }
  }

  /**
   * Rendering for the button
   * @param canvas Rendering the canvas for the button
   * @returns return de button
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(
      canvas, this.startButton,
      canvas.width / 2 - this.startButton.width / 2,
      canvas.height / 2 - this.startButton.height / 2);

    CanvasRenderer.writeText(
      canvas,
      'Space Game',
      canvas.width / 2,
      canvas.height / 3,
      'center',
      'Starjedi',
      188,
      '#C9C9C9'
    );
  }
}
