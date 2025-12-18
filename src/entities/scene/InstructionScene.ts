import StatusScene from './status/StatusScene.js';
import KeyListener from '../../input/KeyListener.js';
import MouseListener from '../../input/MouseListener.js';
import LevelOneScene from './level/LevelOneScene.js';
import Player from '../movingItems/Player.js';
import CanvasRenderer from '../../rendering/CanvasRenderer.js';
import Alien from '../Alien.js';

export default class InstructionScene extends StatusScene {
  private buttonWidth: number = 150;

  private buttonHeight: number = 50;

  private frame: HTMLImageElement = new Image();

  private instructionText: string = [
    'Welkom bij space taxi',
    'Beweeg de ruimte schip met de pijltjes',
    'ga naar de aarde en daar staat een passagier',
    'deze passagier moet naar zijn bestemming toe',
    'breng deze alien naar de juiste planeet',
    'bij deze planeet krijg je een vraag',
    'beantwoord deze vraag correct voor s-bucks!!',
  ]
    .map((line: string) => line.trim() ? `- ${line}` : '')
    .join('\n');


  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.frame = CanvasRenderer.loadNewImage('../../../assets/sci-fi/info-frame.png');
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
    const mousePosition: { x: number, y: number} = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const canvas: HTMLCanvasElement = this.getCanvas();

    const infoScreenY: number = canvas.height / 2 - this.frame.height / 2;

    const insideX: boolean = mousePosition.x >= canvas.width / 2 - this.buttonWidth / 2
      && mousePosition.x <= canvas.width / 2 - this.buttonWidth / 2 + this.buttonWidth;
    const insideY: boolean = mousePosition.y >= infoScreenY + this.frame.height
      && mousePosition.y <= infoScreenY + this.frame.height + this.buttonHeight;

    const insideButton: boolean = insideX && insideY;

    if (insideButton) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }

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
    const buttonImage: HTMLImageElement = CanvasRenderer.loadNewImage('../../../assets/sci-fi/buttons/OK.png');

    const infoScreenX: number = canvas.width / 2 - this.frame.width / 2;
    const infoScreenY: number = canvas.height / 2 - this.frame.height / 2;

    CanvasRenderer.writeText(canvas, 'instructies', canvas.width / 2,
      infoScreenY + 20, 'center', 'Starjedi', 28, '#00ffff');

    CanvasRenderer.drawImage(canvas, buttonImage, canvas.width / 2 - this.buttonWidth / 2,
      infoScreenY + this.frame.height);

    CanvasRenderer.drawImage(canvas, this.frame, infoScreenX, infoScreenY);

    CanvasRenderer.writeInstructions(
      canvas,
      this.instructionText,
      infoScreenX + 20,
      infoScreenY + 50,
      'left',
      'sans-serif',
      20,
      'white'
    );
  }
}
