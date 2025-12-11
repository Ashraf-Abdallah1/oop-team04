import CanvasItem from './CanvasItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Vector2 from '../Vector2.js';

export default class Alien extends CanvasItem {
  private name: string;

  private destination: string;

  private delivered: boolean;

  private planetsToGo: string[] = ['Mars', 'Venus', 'Jupiter', 'Saturn'];

  public constructor(name: string, destination: string) {
    super();
    this.image = CanvasRenderer.loadNewImage('../../assets/Alien.png');
    this.position = new Vector2(70, 100);
    this.name = name;
    this.destination = destination;
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

  /**
   * prints the message above the alien
   * @param message string
   */
  public sayMessage(message: string): void {

  }

  public getPlanetsToGo(): string[] {
    return this.planetsToGo;
  }
}
