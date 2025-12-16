import CanvasRenderer from '../CanvasRenderer.js';
import Vector2 from '../Vector2.js';
import CanvasItem from './CanvasItem.js';

export default class Speedometer extends CanvasItem {
  private speed: number;

  public constructor(boardsSize: Vector2) {
    super();
    this.image = CanvasRenderer.loadNewImage('../../assets/Speedometer.png');
    if (this.image) {
      this.image.onload = (): void => {
        this.position = new Vector2(boardsSize.x - this.image.width - 5, boardsSize.y - this.image.height - 5);
      };
    }

    this.speed = 0;
  }

  public override render(canvas: HTMLCanvasElement, angle?: number): void {
    CanvasRenderer.drawImage(canvas, this.image, this.position.x, this.position.y);
    CanvasRenderer.writeText(canvas, String(this.speed), this.position.x + this.image.width / 2, this.position.y + this.image.height / 2 + 20, 'center', 'arial', 48, '#00ffff');
  }

  public setSpeed(newValue: number): void {
    this.speed = newValue;
  }
}
