import CanvasItem from '../CanvasItem.js';

export default abstract class MovingItem extends CanvasItem {
  protected speed: number;

  protected constructor() {
    super();
    this.speed = 0;
  }

  /**
   * move
   *
   * @param delta time in ms
   * */
  protected abstract move(delta: number): void;

  /**
   * update the entity
   *
   * @param delta delta tijd
   * */
  protected abstract update(delta: number): void;
}
