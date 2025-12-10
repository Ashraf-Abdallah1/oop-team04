import StatusScene from '../StatusScene.js';
import Scene from '../Scene.js';
import KeyListener from '../../../KeyListener.js';
import MouseListener from '../../../MouseListener.js';
import LevelOneScene from '../LevelOneScene.js';

export default class StartScene extends StatusScene {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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
      this.nextScene = new LevelOneScene(this.getCanvas());
    }
  }

  /**
   * Rendering for the button
   * @param canvas Rendering the canvas for the button
   * @returns return de button
   */
  public override render(canvas: HTMLCanvasElement): void {
    canvas = this.getCanvas();
    const renderCanvas: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!renderCanvas) {
      return;
    };

    const titleText: string = 'Space Taxi';
    renderCanvas.fillStyle = '#fbfbfbff';
    renderCanvas.font = '40px Arial';
    renderCanvas.textAlign = 'center';
    renderCanvas.textBaseline = 'top';
    renderCanvas.fillText(titleText, canvas.width / 2, canvas.height / 2 - 100);


    const buttonX: number = canvas.width / 2 - 75;
    const buttonY: number = canvas.height / 2 - 25;
    const buttonWidth: number = 150;
    const buttonHeight: number = 50;

    renderCanvas.fillStyle = '#ffffffff';
    renderCanvas.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    renderCanvas.fillStyle = '#000000ff';
    renderCanvas.font = '20px Arial';
    renderCanvas.textAlign = 'center';
    renderCanvas.textBaseline = 'middle';
    renderCanvas.fillText('START',
      buttonX + buttonWidth / 2,
      buttonY + buttonHeight / 2);
  }
}
