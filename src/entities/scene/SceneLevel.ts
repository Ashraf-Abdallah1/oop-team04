import KeyListener from '../../KeyListener.js';
import Scene from './Scene.js';
import Planet from '../Planet.js';
import Vector2 from '../../Vector2.js';

export default class SceneLevel extends Scene {
  protected planets: Planet[];

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.planets = [];
    this.makePlanets();
  }

  protected makePlanets(): void {
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mercury', 10, 50));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Venus', 14, 80));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Earth', 16, 110));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mars', 12, 140));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Jupiter', 22, 180));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Saturn', 20, 220));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Uranus', 18, 260));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Neptune', 18, 300));
    this.planets.push(new Planet(this.getCanvasCenter(), 'sun', 30, 350));
  }

  private getCanvasCenter(): Vector2 {
    return new Vector2(this.getCanvas().width / 2, this.getCanvas().height / 2);
  }

  /**
   * update the scene
   *  @param delta time in ms elapsed from the GameLoop
   * */
  public override update(delta: number): void {
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
