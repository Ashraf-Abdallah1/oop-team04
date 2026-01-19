import CanvasItem from './CanvasItem.js';
import CanvasRenderer from '../rendering/CanvasRenderer.js';
import Vector2 from '../utils/Vector2.js';

export default class Alien extends CanvasItem {
  private delivered: boolean;

  private planetsToGo: string[] = ['Mercury', 'Neptune', 'Uranus', 'Mars', 'Venus', 'Jupiter', 'Saturn'];

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/Alien.png');
    this.position =
    new Vector2((canvas.width - ((canvas.width / 4 ) * 3)),
      (canvas.height - (canvas.height / 3)) - this.image.height + 30);
    this.delivered = false;
  }

  public getDelivered(): boolean {
    return this.delivered;
  }

  /**
   * sets the isDelivered state to true
   */
  public setDelivered(): void {
    this.delivered = true;
  }

  public getPlanetsToGo(): string[] {
    return this.planetsToGo;
  }

  public setPlanetsToGo(planetsToGo: string[]): void {
    this.planetsToGo = planetsToGo;
  }
}
