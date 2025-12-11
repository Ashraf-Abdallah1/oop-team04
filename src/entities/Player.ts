import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Flame from './Flame.js';
import CanvasItem from './CanvasItem.js';

export default class Player extends MovingItem {
  private acceleration: number;

  private dead: boolean;

  private planetToGo: string= 'Earth';

  protected onCorrectPlanet: boolean = false;

  private onPlanet: boolean;

  private rotation: number;

  private flame: Flame;

  private showFlame: boolean;

  private timeToNextFlame: number;

  private sBucks: number;

  public constructor(boardSize: Vector2) {
    super();
    this.position = new Vector2(boardSize.x / 2, boardSize.y / 2);
    this.image = CanvasRenderer.loadNewImage('../../assets/rockets/Rocket.png');
    this.acceleration = 0;
    this.rotation = 0;
    this.dead = false;
    this.onPlanet = false;
    this.flame = new Flame();
    this.timeToNextFlame = Math.random() * 100;
    this.showFlame = false;
    this.sBucks = 0;
  }

  /**
   * Updates the player's position based on acceleration and rotation.
   * @param delta number
   */
  public override update(delta: number): void {
    const direction: Vector2 = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
    const scaledDirection: Vector2 = new Vector2(direction.x * this.acceleration * delta,
      direction.y * this.acceleration * delta);
    this.position = this.position.add(scaledDirection);

    this.flame.setRotation(this.rotation);

    const flameOffset: Vector2 = new Vector2(
      -Math.cos(this.rotation) * (this.image.width / 2 + 50),
      -Math.sin(this.rotation) * (this.image.width / 2 + 50)
    );

    const flamePosition: Vector2 = this.position.add(flameOffset);

    this.flame.getPosition().x = flamePosition.x;
    this.flame.getPosition().y = flamePosition.y;

    if (!this.showFlame) {
      this.flame.setNewImage(true);
    } else {
      if (this.timeToNextFlame <= 0 ) {
        this.flame.setNewImage(false);
        this.timeToNextFlame = Math.random() * 100;
      }
    }

    this.timeToNextFlame -= delta;
  }

  public getFlame(): Flame {
    return this.flame;
  }

  /**
   * Accelerates the player forward.
   */
  public accelerate(): void {
    this.acceleration = Math.min(this.acceleration + 0.001, 1);
  }

  public setShowFlame(value: boolean): void {
    this.showFlame = value;
  }

  /**
   * Slows down the player (but not achterruit).
   */
  public brake(): void {
    this.acceleration = Math.max(this.acceleration - 0.001, 0);
  }

  /**
   * Rotates the player to the left.
   */
  public turnLeft(): void {
    const rotationSpeed: number = 0.007 * (1 - this.acceleration);
    this.rotation -= rotationSpeed;
  }

  /**
   * Rotates the player to the right.
   */
  public turnRight(): void {
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
  public override move(position: Vector2): void {
  }

  /**
   * Checks if the player is colliding with a given CanvasItem.
   *
   * @param item CanvasItem
   * @returns boolean whether the player is colliding with the item
   * */
  public isCollidingWithItem(item: CanvasItem): boolean {
    return this.position.x < item.getPosition().x + item.getWidth() &&
      this.position.x + this.image.width > item.getPosition().x &&
      this.position.y < item.getPosition().y + item.getHeight() &&
      this.position.y + this.image.height > item.getPosition().y;
  }

  /**
   * is it dead or not
   * @returns boolean
   */
  public isDead(): boolean {
    return this.dead;
  }

  public getSBucks(): number {
    return this.sBucks;
  }

  public setSBucks(bucks: number): void {
    this.sBucks = bucks;
  }

  public getPlanetToGo(): string | null {
    return this.planetToGo;
  }

  public setPlanetToGo(planet: string): void {
    this.planetToGo = planet;
  }

  public isOnCorrectPlanet(): boolean{
    return this.onCorrectPlanet;
  }

  public setOnCorrectPlanet(onRightPlanet: boolean): void {
    this.onCorrectPlanet = onRightPlanet;
  }
}
