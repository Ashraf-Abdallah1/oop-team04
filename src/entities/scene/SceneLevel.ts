import KeyListener from '../../KeyListener.js';
import Scene from './Scene.js';
import Planet from '../Planet.js';
import Vector2 from '../../Vector2.js';
import Question from '../Question.js';
import CanvasRenderer from '../../CanvasRenderer.js';
import Player from '../Player.js';
import MouseListener from '../../MouseListener.js';

export default abstract class SceneLevel extends Scene {
  protected planets: Planet[];

  private sBucksHudImage: HTMLImageElement;

  private sBucksImage: HTMLImageElement;

  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, player);
    this.planets = [];
    this.initializePlanets();
    this.sBucksImage = new Image();
    this.sBucksImage.src = '../../assets/S-bucks.png';
    this.sBucksHudImage = new Image();
    this.sBucksHudImage.src = '../../assets/S-bucksHud.png';
  }

  /**
   * fills the planets array with planets
   * */
  private initializePlanets(): void {
    // betere vragen en answers  bedenken TODO
    this.planets = [
      new Planet(this.getCanvasCenter(), 'Sun', 30, 0, 0, [
        new Question('Wat is de Zon?', 'A', ['Een ster', 'Een planeet', 'Een rots']),
      ]),
      new Planet(this.getCanvasCenter(), 'Mercury', 10, 850, 0.00004, [
        new Question('Welke planeet staat het dichtst bij de Zon?', 'B', ['Aarde', 'Mercurius', 'Mars']),
      ]),
      new Planet(this.getCanvasCenter(), 'Venus', 14, 1100, 0.00003, [
        new Question('Welke planeet is het warmst?', 'C', ['Mars', 'Jupiter', 'Venus']),
      ]),
      new Planet(this.getCanvasCenter(), 'Earth', 16, 1400, 0.00002, [
        new Question('Hoeveel manen heeft de Aarde?', 'B', ['Twee', 'Eén', 'Drie']),
      ]),
      new Planet(this.getCanvasCenter(), 'Mars', 12, 1700, 0.000013, [
        new Question('Welke kleur heeft Mars door het ijzer stof?', 'B', ['Blauw', 'Rood', 'Geel']),
      ]),
      new Planet(this.getCanvasCenter(), 'Jupiter', 22, 2200, 0.00001, [
        new Question('Wat is de grootste planeet in ons zonnestelsel?', 'C', ['Mars', 'Venus', 'Jupiter']),
      ]),
      new Planet(this.getCanvasCenter(), 'Saturn', 20, 2750, 0.000007, [
        new Question('Wat heeft Saturnus rondom zijn planeet?', 'B', ['Grote Vlekken', 'Ringen', 'Rivieren']),
      ]),

      new Planet(this.getCanvasCenter(), 'Uranus', 18, 3200, 0.000005, [
        new Question('Hoe draait Uranus, anders dan de andere planeten?', 'A', ['Op zijn zijkant', 'Heel snel', 'Achteruit']),
      ]),

      new Planet(this.getCanvasCenter(), 'Neptune', 18, 3600, 0.000004, [
        new Question('Welke planeet staat het verst van de Zon?', 'A', ['Neptunus', 'Uranus', 'Venus']),
      ]),
    ];
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

    const hasActiveInteractionKey: boolean = this.planets.some((planet: Planet) => planet.getShowInteractionKey());

    this.planets.forEach((planet: Planet) => {
      planet.update(delta);

      if (!hasActiveInteractionKey) {
        const playerCenter: Vector2 = new Vector2(
          this.player.getPosition().x + this.player.getWidth() / 2,
          this.player.getPosition().y + this.player.getHeight() / 2
        );

        const distance: number = playerCenter.distanceTo(planet.getPosition());

        const planetRadius: number = planet.getHeight() / 2;
        const playerRadius: number = Math.max(this.player.getWidth(), this.player.getHeight()) / 2;

        if (distance <= planetRadius + playerRadius) {
          planet.setShowInteractionKey(true);
        } else {
          planet.setShowInteractionKey(false);
        }
      } else {
        planet.setShowInteractionKey(false);
      }
    });
  }

  /**
   * process input for the scene
   *
   *  @param keyListener the keylistener to get input from
   *  @param mouseListener the mouselistener to get input from
   * */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.player.setShowFlame(false);

    if (keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.accelerate();
      this.player.setShowFlame(true);
    }

    if (keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.turnLeft();
    }

    if (keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.brake();
    }

    if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.turnRight();
    }
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public render(canvas: HTMLCanvasElement): void {
    const cameraX = this.player.getPosition().x - canvas.width / 2;
    const cameraY = this.player.getPosition().y - canvas.height / 2;

    this.planets.forEach((planet: Planet) => {
      planet.render(canvas, cameraX, cameraY);
    });

    this.player.render(canvas, this.player.getRotation(), cameraX, cameraY);
    this.player.getFlame().render(canvas, this.player.getFlame().getRotation(), cameraX, cameraY);

    CanvasRenderer.writeText(canvas, `${this.player.getSBucks()}`, this.sBucksImage.width + 10, 45, 'left', 'sans-serif', 30, 'white');

    if (this.sBucksHudImage.complete) {
      CanvasRenderer.drawImage(canvas, this.sBucksHudImage, 0, -1);
    }
    if (this.sBucksImage.complete) {
      CanvasRenderer.drawImage(canvas, this.sBucksImage, 10, 35 - this.sBucksImage.height / 2);
    }
  }
}
