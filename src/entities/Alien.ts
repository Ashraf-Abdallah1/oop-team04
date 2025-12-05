import CanvasItem from './CanvasItem.js';

export default class Alien extends CanvasItem {
  private name: string;

  private destination: string;

  private isDelivered: boolean;

  private score: number;

  public constructor(name: string, destination: string, score: number) {
    super()
    this.name = name;
    this.destination = destination;
    this.score = score
    this.isDelivered = false;
  }

  public update(delta: number): void {
    // is ff voor het testen want anders gaat linterr af
    console.log(delta, this.score);
  }

  public override render(canvas: HTMLCanvasElement): void {
    // is ff voor het testen want anders gaat linterr af
    console.log(canvas, this.score);
  }

  public getIsDelivered(): boolean {
    return this.isDelivered;
  }

  public deliver(): void {
    this.isDelivered = true;
  }

  public sayMessage(message: string): void {
    // is ff voor het testen want anders gaat linterr af
    console.log(message, this.score)
  }
}