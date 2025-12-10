import KeyListener from '../../KeyListener.js';
import Scene from './Scene.js';
import Planet from '../Planet.js';
import Vector2 from '../../Vector2.js';
import Question from '../Question.js';
import CanvasRenderer from '../../CanvasRenderer.js';
import Player from '../Player.js';

export default abstract class SceneLevel extends Scene {
  protected planets: Planet[];

  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, player);
    this.planets = [];
    this.makePlanets();
  }

  protected makePlanets(): void {
    // betere vragen en answers  bedenken TODO
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mercury', 10, 280, 0.00004, [new Question('wat is de naam', 'A', ['Mercury', 'blauw', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Venus', 14, 350, 0.00003, [new Question('wat is de naam', 'A', ['rood', 'blauw', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Earth', 16, 495, 0.00002, [new Question('wat is de naam', 'A', ['rood', 'blauw', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Mars', 12, 610, 0.000013, [new Question('wat is de naam', 'A', ['rood', 'blauw', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Jupiter', 22, 780, 0.00001, [new Question('wat is de naam', 'A', ['rood', 'blauw', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Saturn', 20, 1050, 0.000007, [new Question('wat is de naam', 'A', ['rood', 'Saturn', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Uranus', 18, 1280, 0.000005, [new Question('wat is de naamr', 'A', ['rood', 'Uranus', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Neptune', 18, 1400, 0.000004, [new Question('wat is de naam', 'A', ['rood', 'Neptune', 'groen'])]));
    this.planets.push(new Planet(this.getCanvasCenter(), 'Sun', 30, 0, 0, [new Question('wat is de naam', 'A', ['Sun', 'blauw', 'groen'])]));
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
    CanvasRenderer.writeText(canvas, `S-Bucks: ${this.player.getSBucks()}`, 20, 40, 'left', 'sans-serif', 30, 'white');
  }
}
