import StatusScene from './status/StatusScene.js';
import KeyListener from './../../KeyListener.js';
import MouseListener from './../../MouseListener.js';
import LevelOneScene from './level/LevelOneScene.js';
import Player from '../movingItem/Player.js';
import CanvasRenderer from './../../CanvasRenderer.js';
import Alien from '../Alien.js';

export default class InstructionScene extends StatusScene {
  private buttonWidth: number = 150;

  private buttonHeight: number = 50;

  private infoScreenWidth: number = 500;

  private infoScreenHeight: number = 500;

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
    const mousePosition: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const canvas: HTMLCanvasElement = this.getCanvas();
    const buttonX: number = canvas.width / 2 - this.buttonWidth / 2;
    const buttonY: number = canvas.height / 2 - this.infoScreenHeight / 2
    + this.infoScreenHeight + 30;

    const insideX : boolean = mousePosition.x >=
    buttonX && mousePosition.x <= buttonX + this.buttonWidth;
    const insideY : boolean = mousePosition.y >=
    buttonY && mousePosition.y <= buttonY + this.buttonHeight;

    const insideButton: boolean = insideX && insideY;


    if (clicked && insideButton) {
      this.nextScene = new LevelOneScene(canvas, this.player, this.alien);
    }
  }

  /**
   * Rendering for the button
   * @param canvas Rendering the canvas for the button
   * @returns return de button
   */
  public override render(canvas: HTMLCanvasElement): void {
    const infoScreenX: number = canvas.width / 2 - this.infoScreenWidth / 2;
    const infoScreenY: number = canvas.height / 2 - this.infoScreenHeight / 2;
    const buttonX: number = canvas.width / 2 - this.buttonWidth / 2;
    const buttonY: number = infoScreenY + this.infoScreenHeight + 30;
    CanvasRenderer.drawButton(
      canvas,
      buttonX,
      buttonY,
      this.buttonWidth,
      this.buttonHeight,
      'Ok',
      '#ffffffff',
      '#000000ff'
    );
    CanvasRenderer.drawRectangle(
      canvas,
      infoScreenX,
      infoScreenY,
      this.infoScreenWidth,
      this.infoScreenHeight,
      '#ffffffff'
    );
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
    CanvasRenderer.writeText(
      canvas,
      'Instructies',
      canvas.width / 2,
      infoScreenY - 50,
      'center',
      'sans-serif',
      50,
      'white'
    );
  }
}
