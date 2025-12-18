import Vector2 from '../../Vector2.js';
import CanvasItem from '../CanvasItem.js';

export default abstract class MovingItem extends CanvasItem {
  protected speed: number;

  protected movingDirection: Vector2;

  public constructor() {
    super();
    this.speed = 0;
    this.movingDirection = new Vector2(0, 0);
  }

  /**
   * bewegen
   *
   * @param position Vector2 positie
   * */
  public abstract move(delta: number): void;

  /**
   * update the entity
   *
   * @param delta delta tijd
   * */
  public abstract update(delta: number): void;
}
