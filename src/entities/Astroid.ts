import MovingItem from './MovingItem.js';

export default class Astroid extends MovingItem {
  private size: number;

  private score: number;

  public constructor(size: number, score: number) {
    super();
    this.size = size;
    this.score = score;
  }

  public override move(delta: number): void {

  }

  public override update(delta: number): void {

  }
}
