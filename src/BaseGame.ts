import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Scene from './entities/scene/Scene.js';
import LevelOneScene from './entities/scene/LevelOneScene.js';
import StartScene from './entities/scene/status/StartScene.js';

export default class BaseGame extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.mouseListener = new MouseListener(canvas);
    this.currentScene = new StartScene(this.canvas);
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    const newScene: Scene | null = this.currentScene.processInput(
      this.keyListener,
      this.mouseListener
    );

    if (newScene !== null) {
      this.currentScene = newScene;
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param delta time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(delta: number): boolean {
    const newScene: Scene | null = this.currentScene.update(delta);

    if (newScene !== null) {
      this.currentScene = newScene;
    }

    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.currentScene.render(this.canvas);
  }
}
