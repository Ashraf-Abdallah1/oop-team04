import KeyListener from '../../../input/KeyListener.js';
import Scene from '../Scene.js';
import Planet from '../../movingItems/Planet.js';
import Vector2 from '../../../utils/Vector2.js';
import Question from '../../Question.js';
import CanvasRenderer from '../../../rendering/CanvasRenderer.js';
import Player from '../../movingItems/Player.js';
import Alien from '../../Alien.js';
import Speedometer from '../../Speedometer.js';
import OnPlanetScene from '../OnPlanetScene.js';

export default abstract class SceneLevel extends Scene {
  protected planets: Planet[];

  private marioRadius: number = 0;

  private closestPlanetData: { planet: Planet | null; distance: number };

  private isMarioEffectActive: boolean = false;

  private sBucksHudImage: HTMLImageElement;

  private sBucksImage: HTMLImageElement;

  private borderRadius: number;

  private speedometer: Speedometer;

  private background: HTMLImageElement;

  private miniMapRadius: number = 153;

  private scale: number = 0.034;

  private minimapOffsetX: number;

  private minimapOffsetY: number = 10;

  private miniMapBig: boolean = false;

  private camera: Vector2 = new Vector2(0, 0);

  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.planets = [];
    this.initializePlanets();
    this.sBucksImage = CanvasRenderer.loadNewImage('../../assets/s-bucks/S-bucks.png');
    this.sBucksHudImage = CanvasRenderer.loadNewImage('../../assets/s-bucks/S-bucksHud.png');
    this.borderRadius = 4500;
    this.speedometer = new Speedometer(new Vector2(canvas.width, canvas.height));
    this.background = new Image();
    this.background = CanvasRenderer.loadNewImage('../../../../assets/BackgroundSpace.png');
    this.minimapOffsetX = canvas.width - 10;
    this.closestPlanetData = { planet: null, distance: 0 };
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

  private renderExtensions(canvas: HTMLCanvasElement): void {
    if (this.isMarioEffectActive && this.closestPlanetData.planet) {
      CanvasRenderer.drawReverseCircle(canvas, this.closestPlanetData.planet.getPosition().x - this.camera.x, this.closestPlanetData.planet.getPosition().y - this.camera.y, this.marioRadius, 'black');
    }
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
  public update(delta: number): void {
    this.closestPlanetData = this.getClosestPlanet();
    const closestPlanet: Planet | null = this.closestPlanetData.planet;
    const closestDistance: number = this.closestPlanetData.distance;

    if (this.isMarioEffectActive && closestPlanet) {
      this.marioRadius -= this.marioRadius / 200 * delta;
      if (this.marioRadius <= 1) {
        this.marioRadius = 0;

        this.nextScene = new OnPlanetScene(this.getCanvas(), this.player,
          closestPlanet, this.alien, this);

        this.isMarioEffectActive = false;
      }
    } else {
      this.player.update(delta);

      this.planets.forEach((planet: Planet) => {
        planet.update(delta);
        planet.setShowInteractionKey(false);
        planet.setShowPointOfInterest(false);

        if (planet.getName() === this.player.getPlanetToGo()) {
          planet.setShowPointOfInterest(true);
        }

        if (closestPlanet) {
          const planetRadius: number = closestPlanet.getHeight() / 2;
          const collisionDistance: number = closestDistance -
          (Math.max(this.player.getWidth(),
            this.player.getHeight()) / 2 + 67 /** SIX SEVEN */ + planetRadius);

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
  }

  /**
   * process input for the scene
   *
   *  @param keyListener the keylistener to get input from
   *  @param mouseListener the mouselistener to get input from
   * */
  public override processInput(keyListener: KeyListener): void {
    this.player.processInput(keyListener);

    if (keyListener.keyPressed(KeyListener.KEY_M)) {
      this.changeMiniMapSize();
    }

    this.handleSceneSwitch(keyListener);
  }

  private handleSceneSwitch(keyListener: KeyListener): void {
    this.closestPlanetData = this.getClosestPlanet();
    const closestPlanet: Planet | null = this.closestPlanetData.planet;
    const closestDistance: number = this.closestPlanetData.distance;

    if (closestPlanet) {
      const planetRadius: number = closestPlanet.getHeight() / 2;
      const collisionDistance: number = closestDistance - (Math.max(this.player.getWidth(),
        this.player.getHeight()) / 2 + 67 /** SIX SEVEN */ + planetRadius);

      if (collisionDistance <= planetRadius && keyListener.isKeyDown(KeyListener.KEY_E)) {
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

  /**
   * Changes the minimap size
   */
  public changeMiniMapSize(): void {
    const scaleChange: number = 2.8;
    if (this.miniMapBig) {
      this.miniMapRadius /= scaleChange;
      this.scale /= scaleChange;
      this.miniMapBig = false;
      this.minimapOffsetX = this.getCanvas().width - 10;
      this.minimapOffsetY = 10;
    } else {
      this.miniMapRadius *= scaleChange;
      this.scale *= scaleChange;
      this.miniMapBig = true;
      this.minimapOffsetX = this.getCanvas().width/2 + this.miniMapRadius;
      this.minimapOffsetY = this.getCanvas().height/2 - this.miniMapRadius;
    }
  }

  /**
   * show minimap
   *
   * @param canvas canvas to draw on
   * */
  public renderMinimap(canvas: HTMLCanvasElement): void {
    const centerMap: Vector2 = new Vector2(
      this.minimapOffsetX - this.miniMapRadius,
      this.minimapOffsetY + this.miniMapRadius
    );

    CanvasRenderer.fillCircle(canvas, centerMap.x, centerMap.y, this.miniMapRadius, 'rgba(0, 0, 0, 0.74)');

    const sun: Planet | undefined = this.planets.find(
      (planet: Planet): boolean => planet.getName() === 'Sun'
    );

    if (!sun) {
      return;
    }

    const worldCenterX: number = sun.getPosition().x;
    const worldCenterY: number = sun.getPosition().y;

    this.planets.forEach((planet: Planet): void => {
      const pos: Vector2 = planet.getPosition();

      const mapX: number = centerMap.x + (pos.x - worldCenterX) * this.scale;
      const mapY: number = centerMap.y + (pos.y - worldCenterY) * this.scale;

      CanvasRenderer.drawCircle(
        canvas,
        centerMap.x,
        centerMap.y,
        planet.getRadius() * this.scale,
        'rgba(255, 255, 255, 0.23)'
      );

      const radius: number = (planet.getHeight() / 2) * this.scale;
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
      centerMap.x + (playerPos.x - worldCenterX) * this.scale,
      centerMap.y + (playerPos.y - worldCenterY) * this.scale,
      5,
      'green'
    );

    CanvasRenderer.drawCircle(
      canvas,
      centerMap.x,
      centerMap.y,
      this.borderRadius * this.scale,
      'rgba(255, 0, 0, 0.57)'
    );
  }

  /**
   * Clears the scene by resetting the next scene to null
   */
  public clearScene(): void {
    this.nextScene = null;
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public override render(canvas: HTMLCanvasElement): void {
    this.camera.x = this.player.getPosition().x - canvas.width / 2;
    this.camera.y = this.player.getPosition().y - canvas.height / 2;

    if (this.background.width > 0) {
      for (let x: number = -5000; x < 10000; x += this.background.width) {
        for (let y: number = -5000; y < 10000; y += this.background.height) {
          CanvasRenderer.drawImage(canvas, this.background, x - this.camera.x, y - this.camera.y);
        }
      }
    }

    this.planets.forEach((planet: Planet) => {
      planet.render(canvas, this.camera.x, this.camera.y);
    });

    this.speedometer.render(canvas);

    CanvasRenderer.drawCircle(
      canvas,
      this.getCanvasCenter().x - this.camera.x,
      this.getCanvasCenter().y - this.camera.y,
      this.borderRadius,
      'red'
    );

    this.player.render(canvas, this.player.getRotation(), this.camera.x, this.camera.y);
    this.player.getFlame().render(canvas, this.player.getFlame().getRotation(),
      this.camera.x, this.camera.y);

    CanvasRenderer.writeText(canvas, `${this.player.getSBucks()}`, this.sBucksImage.width + 30, 52, 'left', 'sans-serif', 30, '#C9C9C9');

    if (this.sBucksHudImage.complete) {
      CanvasRenderer.drawImage(canvas, this.sBucksHudImage, 5, 5);
    }
    if (this.sBucksImage.complete) {
      CanvasRenderer.drawImage(canvas, this.sBucksImage, 30, 40 - this.sBucksImage.height / 2);
    }

    this.renderMinimap(canvas);

    this.renderExtensions(canvas);
  }
}
