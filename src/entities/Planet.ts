import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';

export default class Planet extends MovingItem {
  private name: string;

  private size: number;

  private orbitRadius: number;

  public constructor(middlepoint: Vector2, name: string, size: number, orbitRadius: number) {
    super();
    this.name = name;
    this.size = size;
    this.orbitRadius = orbitRadius;
  }

  /**
   * updates planet
   * @param delta time elapsed
   */
  public override update(delta: number): void {

  }

  /**
   * moves the planet
   * @param position postion of the planet
   */
  public override move(position: Vector2): void {

  }
}
