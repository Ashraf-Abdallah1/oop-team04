import KeyListener from '../../../input/KeyListener.js';
import Scene from '../Scene.js';
import Planet from '../../movingItems/Planet.js';
import Vector2 from '../../../utils/Vector2.js';
import CanvasRenderer from '../../../rendering/CanvasRenderer.js';
import Player from '../../movingItems/Player.js';
import Alien from '../../Alien.js';
import Speedometer from '../../Speedometer.js';
import NotificationManager from '../../NotificationManager.js';

export default abstract class SceneLevel extends Scene {
  private readonly sBucksHudImage: HTMLImageElement;

  private readonly sBucksImage: HTMLImageElement;

  private readonly borderRadius: number;

  protected speedometer: Speedometer;

  private readonly background: HTMLImageElement;

  private miniMapRadius: number = 153;

  private scale: number = 0.034;

  private minimapOffsetX: number;

  private minimapOffsetY: number = 10;

  private miniMapBig: boolean = false;

  private camera: Vector2 = new Vector2(0, 0);

  protected timeToFinish: number;

  protected gameOver: boolean = false;

  protected notificationManager: NotificationManager;

  protected constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.sBucksImage = CanvasRenderer.loadNewImage('../../assets/s-bucks/S-bucks.png');
    this.sBucksHudImage = CanvasRenderer.loadNewImage('../../assets/s-bucks/S-bucksHud.png');
    this.borderRadius = 4500;
    this.speedometer = new Speedometer(new Vector2(canvas.width, canvas.height));
    this.background = new Image();
    this.background = CanvasRenderer.loadNewImage('../../../../assets/BackgroundSpace.png');
    this.minimapOffsetX = canvas.width - 10;
    this.timeToFinish = 500000;
    this.notificationManager = new NotificationManager();
  }

  public abstract update(delta: number): void;

  private renderExtensions(canvas: HTMLCanvasElement): void {
    if (this.isMarioEffectActive && this.closestPlanetData.planet) {
      CanvasRenderer.drawReverseCircle(canvas, this.closestPlanetData.planet.getPosition().x - this.camera.x, this.closestPlanetData.planet.getPosition().y - this.camera.y, this.marioRadius, 'black');
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
        planet.getOrbitRadius() * this.scale,
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
    if (this.timeToFinish <= 0) {
      CanvasRenderer.fillCanvas(canvas, 'black');
      CanvasRenderer.writeText(canvas, 'Tijd is om!', canvas.width / 2, canvas.height / 2, 'center', 'Starjedi', 72, 'white');

      if (!this.gameOver) {
        this.gameOver = true;

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      return;
    }

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

    CanvasRenderer.writeText(canvas, `Time left: ${Math.ceil(this.timeToFinish / 1000)}s`, 10, 110, 'left', 'Starjedi', 24, 'white');

    if(this.player.getLevel() === 2){
      let planetDescription: string = '';
      this.planets.forEach((planet: Planet) => {
        if (this.player.getPlanetToGo() == planet.getName()) {
          planetDescription = planet.getDescription();
        }
      });
      CanvasRenderer.writeText(
        canvas,
        planetDescription,
        canvas.width / 2,
        25,
        'center',
        'Starjedi',
        24,
        'white'
      );
    }

    this.showNotifications();
    this.notificationManager.updateAndRender(canvas);
  }

  public showNotifications(): void {
    if (this.timeToFinish < 498000 && this.timeToFinish > 496000) {
      this.notificationManager.show('Tip! Druk op M om de minimap te openen', 'info');
    }

    if (this.speedometer.getSpeed() >= 6000) {
      this.notificationManager.show('Let op! Verminder snelheid om goed te kunnen sturen', 'warning');
    }

    if (this.timeToFinish <= 60000 && this.timeToFinish >= 56000) {
      this.notificationManager.show('Je hebt nog 60 seconden over', 'warning');
    }

    if (this.timeToFinish <= 30000 && this.timeToFinish >= 26000) {
      this.notificationManager.show('Je hebt nog 30 seconden over', 'warning');
    }
  }
}
