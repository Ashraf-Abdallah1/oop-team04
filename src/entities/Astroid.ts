import Vector2 from '../Vector2.js';
import MovingItem from './MovingItem.js';

export default class Astroid extends MovingItem {
  private size: number;

  private score: number;

  public constructor(size: number, score: number) {
    super();
    this.size = size;
    this.score = score;
  }

  public override move(position: Vector2): void {

  }

  public override update(delta: number): void {

  }
}
