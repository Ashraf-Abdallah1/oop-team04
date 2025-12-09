import KeyListener from '../../KeyListener.js';
import Scene from './Scene.js';
import Planet from '../Planet.js';
import Vector2 from '../../Vector2.js';

export default abstract class SceneLevel extends Scene {
  protected planets: Planet[];

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.planets = [];
    this.makePlanets();
  }

  protected makePlanets(): void {
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mercury', 10, 280));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Venus', 14, 350));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Earth', 16, 495));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mars', 12, 610));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Jupiter', 22, 780));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Saturn', 20, 1050));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Uranus', 18, 1280));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Neptune', 18, 1400));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Sun', 30, 0));
  }

  private getCanvasCenter(): Vector2 {
    return new Vector2(this.getCanvas().width / 2, this.getCanvas().height / 2);
  }

  /**
   * update the scene
   *  @param delta time in ms elapsed from the GameLoop
   * */
  public override update(delta: number): void {
    this.player.update(delta);
    this.planets.forEach(((planet: Planet) => planet.update(delta)));
  }

  /**
   * process input for the scene
   *  @param keyListener the keylistener to get input from
   * */
  public override processInput(keyListener: KeyListener): void {
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
    this.player.render(canvas);
  }
}
