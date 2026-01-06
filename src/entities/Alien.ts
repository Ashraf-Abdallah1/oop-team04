import CanvasItem from './CanvasItem.js';
import CanvasRenderer from '../rendering/CanvasRenderer.js';
import Vector2 from '../utils/Vector2.js';

export default class Alien extends CanvasItem {
  private delivered: boolean;

  private planetsToGo: string[] = ['Mars'];

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.image = CanvasRenderer.loadNewImage('../../assets/Alien.png');
    this.position = new Vector2(240, (canvas.height - (canvas.height / 3)) - this.image.height + 30);
    this.delivered = false;
  }

  /**
   *  updates the alien
   * @param delta number
   */
  public update(delta: number): void {
    if(this.delivered) {
      this.delivered = false;
    }
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
