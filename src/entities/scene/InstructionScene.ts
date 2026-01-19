import StatusScene from './status/StatusScene.js';
import KeyListener from '../../input/KeyListener.js';
import MouseListener from '../../input/MouseListener.js';
import LevelOneScene from './level/LevelOneScene.js';
import Player from '../movingItems/Player.js';
import CanvasRenderer from '../../rendering/CanvasRenderer.js';
import Alien from '../Alien.js';

export default class InstructionScene extends StatusScene {
  private readonly frame: HTMLImageElement;

  private readonly button: HTMLImageElement;

  private instructionText: string = [
    'Welkom bij space taxi',
    'Beweeg het ruimte schip met de pijltjes of WASD',
    'ga naar de rode planeet op de minimap, er wacht daar een passagier',
    'deze passagier moet naar zijn bestemming toe',
    'breng deze alien naar de juiste planeet',
    'bij deze planeet krijg je een vraag',
    'beantwoord deze vraag correct voor s-bucks!!',
  ]
    .map((line: string) => line.trim() ? `- ${line}` : '')
    .join('\n');

  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.frame = CanvasRenderer.loadNewImage('assets/sci-fi/info-frame.png');
    this.button = CanvasRenderer.loadNewImage('assets/sci-fi/buttons/OK.png');
  }

  /**
   * See if we have pressed the button on the screen
   * @param keyListener keyListener
   * @param mouseListener keyListener
   * @returns Returns the Scene
   */
  public override processInput(
    keyListener: KeyListener,
    mouseListener: MouseListener
  ): void {
    this.checkButtonClick(mouseListener);
  }

  /**
   * checks if the button is clicked
   * @param mouseListener mouse listener
   */
  private checkButtonClick(mouseListener: MouseListener): void {
    const mousePosition: { x: number, y: number} = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();
    const canvas: HTMLCanvasElement = this.getCanvas();

    const insideButton: boolean = mousePosition.x >= (canvas.width / 2) - (this.button.width / 2) &&
      mousePosition.x <= (canvas.width / 2) + (this.button.width / 2) &&
      mousePosition.y >= canvas.height / 2 - this.frame.height / 2 + this.frame.height &&
      mousePosition.y <= canvas.height / 2 - this.frame.height / 2
        + this.frame.height + this.button.height;

    canvas.style.cursor = insideButton ? 'pointer' : 'default';

    if (clicked && insideButton) {
      canvas.style.cursor = 'default';
      this.nextScene = new LevelOneScene(canvas, this.player, this.alien);
    }
  }

  /**
   * Rendering for the button
   * @param canvas Rendering the canvas for the button
   * @returns return de button
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.writeText(canvas, 'instructies', canvas.width / 2,
      canvas.height / 2 - this.frame.height / 2 + 20, 'center', 'Starjedi', 28, '#00ffff');

    CanvasRenderer.drawImage(canvas, this.button, canvas.width / 2 - 75,
      canvas.height / 2 - this.frame.height / 2 + this.frame.height);

    CanvasRenderer.drawImage(canvas, this.frame, canvas.width / 2 - this.frame.width / 2,
      canvas.height / 2 - this.frame.height / 2);

    CanvasRenderer.writeInstructions(
      canvas,
      this.instructionText,
      canvas.width / 2 - this.frame.width / 2 + this.frame.width / 10,
      canvas.height / 2 - this.frame.height / 2 + 120,
      'start',
      'Starjedi',
      20,
      '#C9C9C9'
    );
  }
}
