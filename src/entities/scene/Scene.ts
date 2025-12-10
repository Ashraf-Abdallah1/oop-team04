import Player from '../Player.js';
import KeyListener from '../../KeyListener.js';
import Vector2 from '../../Vector2.js';

export default abstract class Scene {
  protected player: Player;

  protected level: number;

  protected sBucket: number;

  protected nextScene: Scene | null = null;

  private canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement, player: Player) {
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.player = player;
    this.level = 1;
    this.sBucket = 0;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
  public abstract update(delta: number): void;

  public abstract processInput(keyListener: KeyListener): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public getNextScene(): Scene | null {
    return this.nextScene;
  }
}
