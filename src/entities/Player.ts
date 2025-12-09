import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Player extends MovingItem {
  private acceleration: number;

  private dead: boolean;

  private onPlanet: boolean;

  private rotation: number;

  public constructor(boardSize: Vector2) {
    super();
    this.position = new Vector2(boardSize.x / 2, boardSize.y / 2);
    this.image = CanvasRenderer.loadNewImage('../../assets/Rocket.png');
    this.acceleration = 0;
    this.rotation = 0;
    this.dead = false;
    this.onPlanet = false;
  }

  /**
   * Updates the player's position based on acceleration and rotation.
   * @param delta number
   */
  public override update(delta: number): void {
    const direction: Vector2 = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
    const scaledDirection: Vector2 = new Vector2(direction.x * this.acceleration * delta, direction.y * this.acceleration * delta);
    this.position = this.position.add(scaledDirection);
  }

  /**
   * Accelerates the player forward.
   */
  public accelerate(): void {
    this.acceleration = Math.min(this.acceleration + 0.001, 1);
  }

  /**
   * Slows down the player (but not achterruit).
   */
  public brake(): void {
    this.acceleration = Math.max(this.acceleration - 0.001, 0);
  }

  /**
   * Rotates the player to the left.
   * @param canvas HTMLCanvasElement
   */
  public turnLeft(canvas: HTMLCanvasElement): void {
    const rotationSpeed: number = 0.007 * (1 - this.acceleration);
    this.rotation -= rotationSpeed;
  }

  /**
   * Rotates the player to the right.
   * @param canvas HTMLCanvasElement
   */
  public turnRight(canvas: HTMLCanvasElement): void {
    const rotationSpeed: number = 0.007 * (1 - this.acceleration);
    this.rotation += rotationSpeed;
  }

  public getRotation(): number {
    return this.rotation;
  }

  /**
   * move the player
   * @param position postion to go
   */
  public override move(position: Vector2): void {}

  public isDead(): boolean {
    return this.dead;
  }
}
