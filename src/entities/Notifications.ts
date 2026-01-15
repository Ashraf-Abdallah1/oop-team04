import CanvasRenderer from '../rendering/CanvasRenderer.js';
import Vector2 from '../utils/Vector2.js';

export default class Notifications {
  private position: Vector2;

  private notificationText: string;

  private alpha: number = 1;

  public constructor(text: string, position: Vector2) {
    this.notificationText = text;
    this.position = position;
  }

  public update(): void {
    if (this.position.y < 200) {
      this.position.y += 1;
    }
  }

  /**
   * rendered de notify
   * @param canvas element van de html pagina
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.writeText(canvas, this.notificationText, this.position.x, this.position.y, 'center', 'Arial', 40, 'rgb(255, 255, 255)');
  }

  public openMinimap(canvas: HTMLCanvasElement): void {
    CanvasRenderer.writeText(canvas, 'Tip! Druk op M om de minimap te openen', canvas.width / 2, 150, 'center', 'Arial', 30, 'rgb(0, 255, 255)');
  }

  public sixtySecondsleft(canvas: HTMLCanvasElement): void {
    CanvasRenderer.writeText(canvas, 'Je hebt nog 60 seconden over!', canvas.width / 2, 150, 'center', 'Arial', 30, 'rgb(0, 255, 255)');
  }
}
