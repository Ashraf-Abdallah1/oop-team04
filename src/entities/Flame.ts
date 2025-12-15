import CanvasRenderer from '../CanvasRenderer.js';
import CanvasItem from './CanvasItem.js';

export default class Flame extends CanvasItem {
  private rotation: number;

  private currentImageIndex: number;

  public constructor() {
    super();
    this.rotation = 0;
    this.currentImageIndex = 0;
  }

  public override render(
  canvas: HTMLCanvasElement, angle?: number, cameraX: number = 0, cameraY: number = 0): void {
  CanvasRenderer.drawImage(canvas, this.image, this.position.x - cameraX - this.image.width / 2, this.position.y - cameraY - this.image.height / 2, angle);
}

  public setRotation(newRotation: number): void {
    this.rotation = newRotation;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public setNewImage(noImage: boolean): void {

    if (noImage) {
      this.image = CanvasRenderer.loadNewImage('./assets/flames/0.png');
    } else {
      this.currentImageIndex += 1;

      this.image = CanvasRenderer.loadNewImage(`./assets/flames/${this.currentImageIndex}.png`);
      if (this.currentImageIndex === 3) {
        this.currentImageIndex = 1;
      }
    }
  }
}
