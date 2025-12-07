import Player from '../Player.js';
import CanvasItem from '../CanvasItem.js';
import KeyListener from '../../KeyListener.js';
import Vector2 from '../../Vector2.js';

export default abstract class Scene extends CanvasItem {
  protected player: Player;

  protected level: number;

  protected sBucket: number;

  private canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.boardSize = new Vector2(this.canvas.width, this.canvas.height);

    // verget niet straks bij de andere scenes de player position waarde te geven (level 1)
    this.player = new Player(this.boardSize);
    this.level = 1;
    this.sBucket = 0;
  }
  public abstract update(delta: number): void;

  public abstract processInput(keyListener: KeyListener): void;
}
