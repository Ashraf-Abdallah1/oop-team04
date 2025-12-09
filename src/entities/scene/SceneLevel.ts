import KeyListener from '../../KeyListener.js';
import Scene from './Scene.js';
import Planet from '../Planet.js';
import Vector2 from '../../Vector2.js';
import MouseListener from '../../MouseListener.js';

export default abstract class SceneLevel extends Scene {
  protected planets: Planet[];

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.planets = [];
    this.makePlanets();
  }

  protected makePlanets(): void {
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mercury', 10, 280, 0.00004));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Venus', 14, 350, 0.00003));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Earth', 16, 495, 0.00002));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mars', 12, 610, 0.000013));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Jupiter', 22, 780, 0.00001));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Saturn', 20, 1050, 0.000007));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Uranus', 18, 1280, 0.000005));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Neptune', 18, 1400, 0.000004));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Sun', 30, 0, 0));
  }

  private getCanvasCenter(): Vector2 {
    return new Vector2(this.getCanvas().width / 2, this.getCanvas().height / 2);
  }

  /**
   * update the scene
   *  @param delta time in ms elapsed from the GameLoop
   *  @returns
   * */
  public override update(delta: number): Scene | null {
    this.player.update(delta);
    this.planets.forEach(((planet: Planet) => planet.update(delta)));
    return null;
  }

  /**
   * process input for the scene
   *  @param keyListener the keylistener to get input from
   *  @param mouseListener the mouseListener to get input from
   *  @returns
   * */
  public override processInput(keyListener: KeyListener,
    mouseListener: MouseListener
  ): Scene | null {
    if (keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.accelerate();
    }

    if (keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.turnLeft(this.getCanvas());
    }

    if (keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.brake();
    }

    if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.turnRight(this.getCanvas());
    }
    return null;
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public render(canvas: HTMLCanvasElement): void {
    this.planets.forEach(((planet: Planet) => {
      planet.render(canvas);
    }));
    this.player.render(canvas, this.player.getRotation());
  }
}
