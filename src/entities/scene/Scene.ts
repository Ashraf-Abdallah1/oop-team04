import Player from '../movingItems/Player.js';
import KeyListener from '../../input/KeyListener.js';
import MouseListener from '../../input/MouseListener.js';
import Alien from '../Alien.js';
import Planet from '../movingItems/Planet.js';
import Vector2 from '../../utils/Vector2.js';
import Question from '../Question.js';
import {planetData} from '../../data/planets.js';
import { PlanetData, QuestionData } from '../../data/PlanetData.js';

export default abstract class Scene {
  protected planets: Planet[] = [];

  protected player: Player;

  protected alien: Alien;

  protected level: number;

  protected nextScene: Scene | null = null;

  protected closestPlanetData: { planet: Planet | null; distance: number };

  protected marioRadius: number = 0;

  protected isMarioEffectActive: boolean = false;

  private readonly canvas: HTMLCanvasElement;

  protected constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    this.canvas = canvas;
    this.player = player;
    this.initializePlanets();
    this.level = 1;
    this.alien = alien;
    this.closestPlanetData = { planet: null, distance: 0 };
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

  protected handleSceneSwitch(keyListener: KeyListener): void {
    this.closestPlanetData = this.getClosestPlanet();
    const closestPlanet: Planet | null = this.closestPlanetData.planet;
    const closestDistance: number = this.closestPlanetData.distance;

    if (closestPlanet) {
      const planetRadius: number = closestPlanet.getHeight() / 2;
      const collisionDistance: number = closestDistance - (Math.max(this.player.getWidth(),
        this.player.getHeight()) / 2 + 67 /** SIX SEVEN */ + planetRadius);

      if (collisionDistance <= planetRadius
        && keyListener.isKeyDown(KeyListener.KEY_E)
        && !this.isMarioEffectActive
        && closestPlanet.getName() !== 'Sun'
      ) {
        this.isMarioEffectActive = true;
        this.marioRadius = Math.max(this.getCanvas().width, this.getCanvas().height);

        if (this.player.getPlanetToGo()?.toString() !== closestPlanet.getName().toString()) {
          this.player.setOnCorrectPlanet(false);
        } else {
          this.player.setOnCorrectPlanet(true);
        }
      }
    }
  }

  public getClosestPlanet(): { planet: Planet | null; distance: number } {
    let closestPlanet: Planet | null = null;
    let closestDistance: number = Infinity;

    this.planets.forEach((planet: Planet) => {
      const distance : number = this.player.getPosition().distanceTo(planet.getPosition());

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPlanet = planet;
      }
    });

    return { planet: closestPlanet, distance: closestDistance };
  }

  protected getCanvasCenter(): Vector2 {
    return new Vector2(this.getCanvas().width / 2, this.getCanvas().height / 2);
  }

  /**
   * fills the planets array with planets
   * */
  private initializePlanets(): void {
    const center: Vector2 = this.getCanvasCenter();
    this.planets = planetData.map((data: PlanetData) =>
      new Planet(
        center,
        data.name,
        data.orbitRadius,
        data.orbitSpeed,
        data.questions.map(
          (q: QuestionData) =>
            new Question(q.question, q.correctAnswer, q.answers)
        )
      )
    );
  }
}
