import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default abstract class CanvasItem {
  protected boardSize: Vector2;

  protected image: HTMLImageElement;

  protected position: Vector2;

  public constructor() {
    this.boardSize = new Vector2(0, 0);
    this.image = new Image();
    this.position = new Vector2(0, 0);
  }

  /**
   * render the canvas
   *
   * @param canvas de canvas
   * */
  public render(canvas: HTMLCanvasElement, angle?: number): void {
    CanvasRenderer.drawImage(canvas, this.image, this.position.x, this.position.y, angle);
  }

  public getPosition(): Vector2 {
    return this.position;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }
}
