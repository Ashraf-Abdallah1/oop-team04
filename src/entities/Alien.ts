import CanvasItem from './CanvasItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Vector2 from '../Vector2.js';

export default class Alien extends CanvasItem {
  private delivered: boolean;

  private planetsToGo: string[] = ['Mercury', 'Neptune', 'Uranus', 'Mars', 'Venus', 'Jupiter', 'Saturn'];

  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('../../assets/Alien.png');
    this.position = new Vector2(70, 100);
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
