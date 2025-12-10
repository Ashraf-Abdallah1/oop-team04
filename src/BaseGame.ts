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

  private currentScene: Scene | null;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.mouseListener = new MouseListener(canvas);
    this.currentScene = new StartScene(this.canvas);
    if (this.currentScene instanceof StartScene){
      this.canvas.style.cursor ='default';
    } else {
      this.canvas.style.cursor ='none';
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if( this.currentScene !== null) {
      this.currentScene.processInput(this.keyListener, this.mouseListener);
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param delta time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(delta: number): boolean {
    if( this.currentScene !== null) {
      if(this.currentScene.getNextScene() !== null ) {
        this.currentScene = this.currentScene.getNextScene();
      }
    }
    this.currentScene?.update(delta);
    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    if( this.currentScene !== null ) {
      this.currentScene.render(this.canvas);
    }
  }
}
