import Player from '../movingItems/Player.js';
import KeyListener from '../../input/KeyListener.js';
import MouseListener from '../../input/MouseListener.js';
import Alien from '../Alien.js';

export default abstract class Scene {
  protected player: Player;

  protected alien: Alien;

  protected level: number;

  protected sBucket: number;

  protected nextScene: Scene | null = null;

  private readonly canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.player = player;
    this.level = 1;
    this.sBucket = 0;
    this.alien = alien;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public abstract processInput(
    keyListener: KeyListener,
    mouseListener?: MouseListener
  ): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public getNextScene(): Scene | null {
    return this.nextScene;
  }
}
