import Player from '../Player.js';
import KeyListener from '../../KeyListener.js';
import Vector2 from '../../Vector2.js';
import MouseListener from '../../MouseListener.js';

export default abstract class Scene {
  protected player: Player;

  protected level: number;

  protected sBucket: number;

  protected nextScene: Scene | null = null;

  private canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.player = new Player(new Vector2(100, 100));
    this.level = 1;
    this.sBucket = 0;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
  public abstract update(delta: number): void;

  public abstract processInput(
    keyListener: KeyListener,
    mouseListener: MouseListener
  ): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public getNextScene(): Scene | null {
    return this.nextScene;
  }
}
