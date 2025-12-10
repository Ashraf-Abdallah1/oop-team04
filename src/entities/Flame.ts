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
