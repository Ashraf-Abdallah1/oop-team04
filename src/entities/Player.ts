import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Player extends MovingItem {
  private acceleration: number;

  private dead: boolean;

  private onPlanet: boolean;

  public constructor(boardSize: Vector2) {
    super();
    this.position.x = boardSize.x;
    this.position.y = boardSize.y;
    this.image = CanvasRenderer.loadNewImage('../../assets/Rocket.png');
    this.acceleration = 0;
    this.dead = false;
    this.onPlanet = false;
  }

  /**
   * updates player
   *
   * @param delta time elapsed
   */
  public override update(delta: number): void {

  }

  /**
   * move the player
   * @param position postion to go
   */
  public override move(position: Vector2): void {

  }

  public isDead(): boolean {
    return this.dead;
  }
}
