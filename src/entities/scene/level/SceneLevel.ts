import KeyListener from '../../../KeyListener.js';
import Scene from '../Scene.js';
import Planet from '../../Planet.js';
import Vector2 from '../../../Vector2.js';
import Question from '../../Question.js';
import CanvasRenderer from '../../../CanvasRenderer.js';
import Player from '../../Player.js';
import MouseListener from '../../../MouseListener.js';
import Alien from '../../Alien.js';
import Speedometer from '../../Speedometer.js';

export default abstract class SceneLevel extends Scene {
  protected planets: Planet[];

  private sBucksHudImage: HTMLImageElement;

  private sBucksImage: HTMLImageElement;

  private borderRadius: number;

  private speedometer: Speedometer;

  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.planets = [];
    this.initializePlanets();
    this.sBucksImage = new Image();
    this.sBucksImage.src = '../../assets/S-bucks.png';
    this.sBucksHudImage = new Image();
    this.sBucksHudImage.src = '../../assets/S-bucksHud.png';
    this.borderRadius = 4500;
    this.speedometer = new Speedometer(new Vector2(canvas.width, canvas.height));
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

    const playerRadius: number = Math.max(this.player.getWidth(), this.player.getHeight()) / 2;

    this.planets.forEach((planet: Planet) => {
      planet.update(delta);
      planet.setShowInteractionKey(false);
      planet.setShowPointOfInterest(false);
    });

    const closestPlanetData: { planet: Planet | null; distance: number } = this.getClosestPlanet();
    const closestPlanet: Planet | null = closestPlanetData.planet;
    const closestDistance: number = closestPlanetData.distance;

    this.planets.forEach((planet: Planet) => {
      if (planet.getName() === this.player.getPlanetToGo()) {
        planet.setShowPointOfInterest(true);
      }

      if (closestPlanet) {
        const planetRadius: number = closestPlanet.getHeight() / 2;
        const collisionDistance: number = closestDistance -
        (playerRadius + 67 /** SIX SEVEN */ + planetRadius);

        if (collisionDistance <= 0) {
          closestPlanet.setShowInteractionKey(true);
        }
      }

      if (planet.getName() === 'Sun') {
        this.player.isCollidingWithSun(planet);
      }
    });

    this.speedometer.setSpeed(Math.round(this.player.getAcceleration() * 10000));
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

  public renderMinimap(canvas: HTMLCanvasElement): void {
    const miniMapsRadius: number = 153;
    const scale: number = 0.034;

    const offsetX: number = canvas.width - 10;
    const offsetY: number = 10;

    const centerMap: Vector2 = new Vector2(
      offsetX - miniMapsRadius,
      offsetY + miniMapsRadius
    );

    CanvasRenderer.fillCircle(canvas, centerMap.x, centerMap.y, miniMapsRadius, 'rgba(0, 0, 0, 0.74)');

    const sun: Planet | undefined = this.planets.find(
      (p: Planet): boolean => p.getName() === 'Sun'
    );

    if (!sun) {
      return;
    }

    const worldCenterX: number = sun.getPosition().x;
    const worldCenterY: number = sun.getPosition().y;

    this.planets.forEach((planet: Planet): void => {
      const pos: Vector2 = planet.getPosition();

      const mapX: number = centerMap.x + (pos.x - worldCenterX) * scale;
      const mapY: number = centerMap.y + (pos.y - worldCenterY) * scale;

      CanvasRenderer.drawCircle(
        canvas,
        centerMap.x,
        centerMap.y,
        planet.getRadius() * scale,
        'rgba(255, 255, 255, 0.23)'
      );

      const radius: number = (planet.getHeight() / 2) * scale;
      const color: string = planet.getName() === 'Sun'
        ? 'rgba(255, 128, 0, 0.68)'
        : planet.getRenderPointOfInterestKey()
          ? 'rgba(255, 0, 0, 0.55)'
          : 'rgba(255, 255, 255, 0.55)';

      CanvasRenderer.fillCircle(canvas, mapX, mapY, radius, color);
    });

    const playerPos: Vector2 = this.player.getPosition();

    CanvasRenderer.fillCircle(
      canvas,
      centerMap.x + (playerPos.x - worldCenterX) * scale,
      centerMap.y + (playerPos.y - worldCenterY) * scale,
      5,
      'green'
    );

    CanvasRenderer.drawCircle(
      canvas,
      centerMap.x,
      centerMap.y,
      this.borderRadius * scale,
      'rgba(255, 0, 0, 0.57)'
    );
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public override render(canvas: HTMLCanvasElement): void {
    const cameraX: number = this.player.getPosition().x - canvas.width / 2;
    const cameraY: number = this.player.getPosition().y - canvas.height / 2;

    this.planets.forEach((planet: Planet) => {
      planet.render(canvas, cameraX, cameraY);
    });

    this.speedometer.render(canvas);

    CanvasRenderer.drawCircle(
      canvas,
      this.getCanvasCenter().x - cameraX,
      this.getCanvasCenter().y - cameraY,
      this.borderRadius,
      'red'
    );

    this.player.render(canvas, this.player.getRotation(), cameraX, cameraY);
    this.player.getFlame().render(canvas, this.player.getFlame().getRotation(), cameraX, cameraY);

    CanvasRenderer.writeText(canvas, `${this.player.getSBucks()}`, this.sBucksImage.width + 30, 52, "left", "sans-serif", 30, "white");

    if (this.sBucksHudImage.complete) {
      CanvasRenderer.drawImage(canvas, this.sBucksHudImage, 5, 5);
    }
    if (this.sBucksImage.complete) {
      CanvasRenderer.drawImage(canvas, this.sBucksImage, 30, 40 - this.sBucksImage.height / 2);
    }
    this.renderMinimap(canvas);
  }
}
