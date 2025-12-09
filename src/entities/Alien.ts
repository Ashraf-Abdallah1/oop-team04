import CanvasItem from './CanvasItem.js';

export default class Alien extends CanvasItem {
  private name: string;

  private destination: string;

  private isDelivered: boolean;

  private score: number;

  public constructor(name: string, destination: string, score: number) {
    super();
    this.name = name;
    this.destination = destination;
    this.score = score;
    this.isDelivered = false;
  }

  /**
   *  updates the alien
   * @param delta number
   */
  public update(delta: number): void {
    // is ff voor het testen want anders gaat linterr af
    console.log(delta, this.score);
  }

  public getIsDelivered(): boolean {
    return this.isDelivered;
  }

  /**
   * sets the isDelivered state to true
   */
  public deliver(): void {
    this.isDelivered = true;
  }

  /**
   * prints the message above the alien
   * @param message string
   */
  public sayMessage(message: string): void {
    // is ff voor het testen want anders gaat linterr af
    console.log(message, this.score);
  }
}
