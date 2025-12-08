import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Planet extends MovingItem {
  private name: string;

  private size: number;

  private orbitRadius: number;

  private middelpoint: Vector2;

  public constructor(middlepoint: Vector2, name: string, size: number, orbitRadius: number) {
    super();
    this.name = name;
    this.size = size;
    this.orbitRadius = orbitRadius;
    this.middelpoint = middlepoint;
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

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawCircle(canvas, this.middelpoint.x, this.middelpoint.y, this.orbitRadius, 'green');
  }
}
