import MovingItem from './MovingItem.js';
import Vector2 from '../../utils/Vector2.js';
import CanvasRenderer from '../../rendering/CanvasRenderer.js';
import Flame from '../Flame.js';
import Planet from './Planet.js';
import KeyListener from '../../input/KeyListener.js';

export default class Player extends MovingItem {
  private acceleration: number;

  private planetToGo: string;

  private onCorrectPlanet: boolean = false;

  private rotation: number;

  private readonly flame: Flame;

  private showFlame: boolean;

  private timeToNextFlame: number;

  private sBucks: number;

  private turnDirection: 'left' | 'right' | 'none';

  private moveType: 'brake' | 'accelerate' | 'none';

  private level: number = 1;

  private rocketSkin: string;

  private readonly playerRadius: number;

  public constructor(boardSize: Vector2) {
    super();
    this.rocketSkin = 'rocket';
    this.image = CanvasRenderer.loadNewImage(`./assets/rockets/${this.rocketSkin}.png`);
    this.image.onload = (): void => {
      this.position = new Vector2(0, 0);
    };
    this.boardSize = boardSize;
    this.acceleration = 0;
    this.rotation = 0;
    this.flame = new Flame();
    this.timeToNextFlame = Math.random() * 100;
    this.showFlame = false;
    this.sBucks = 0;
    this.turnDirection = 'none';
    this.moveType = 'none';
    this.planetToGo = 'Earth';
    this.playerRadius = Math.max(this.image.width, this.image.height) / 2;
  }

  /**
   * Updates the player's position based on acceleration and rotation.
   * @param delta number
   */
  public override update(delta: number): void {
    this.move(delta);
    this.keepPlayerWithinMap();
    this.changeSkins();
    this.image = CanvasRenderer.loadNewImage(`./assets/rockets/${this.rocketSkin}.png`);
  }

  private changeSkins(): void {
    if (this.sBucks < 500) {
      this.rocketSkin = 'Rocket';
    }
    if (this.sBucks >= 500) {
      this.rocketSkin = 'Rocket1';
    }
    if (this.sBucks >= 1000) {
      this.rocketSkin = 'Rocket2';
    }
    if (this.sBucks >= 1500) {
      this.rocketSkin = 'Rocket3';
    }
  }

  /**
   * move the player
   * @param delta time in ms
   */
  public override move(delta: number): void {
    const rotationSpeed: number = (0.001 * (1 - this.acceleration)) * delta;
    if (this.turnDirection === 'right') {
      this.rotation += rotationSpeed;
    } else if (this.turnDirection === 'left') {
      this.rotation -= rotationSpeed;
    }

    if (this.moveType === 'accelerate') {
      this.acceleration = Math.min(this.acceleration + 0.0001 * delta, 0.67);
    } else if (this.moveType === 'brake') {
      this.acceleration = Math.max(this.acceleration - 0.0001 * delta, 0);
    }

    this.turnDirection = 'none';
    this.moveType = 'none';

    const direction: Vector2 = new Vector2(
      Math.cos(this.rotation),
      Math.sin(this.rotation)
    ).scale(delta);

    this.position = this.position.add(
      new Vector2(direction.x * this.acceleration, direction.y * this.acceleration)
    );

    this.flame.setRotation(this.rotation);

    const flamePosition: Vector2 = this.position.add(new Vector2(
      -Math.cos(this.rotation) * (this.image.width / 2 + 50),
      -Math.sin(this.rotation) * (this.image.width / 2 + 50)
    ));

    this.flame.getPosition().x = flamePosition.x;
    this.flame.getPosition().y = flamePosition.y;

    if (!this.showFlame) {
      this.flame.setNewImage(true);
    } else {
      if (this.timeToNextFlame <= 0) {
        this.flame.setNewImage(false);
        this.timeToNextFlame = Math.random() * 100;
      }
    }
    this.timeToNextFlame -= delta;
  }

  /**
   * keep the player in the map
   *
   * */
  private keepPlayerWithinMap(): void {
    const mapCenter: Vector2 = new Vector2(window.innerWidth / 2, window.innerHeight / 2);

    const playerCenter: Vector2 = new Vector2(
      this.position.x + this.image.width / 2,
      this.position.y + this.image.height / 2,
    );

    const dx: number = playerCenter.x - mapCenter.x;
    const dy: number = playerCenter.y - mapCenter.y;
    const distance: number = Math.sqrt(dx * dx + dy * dy);

    const playerRadius: number = Math.max(this.image.width, this.image.height) / 2;
    const maxDistance: number = 4500 - playerRadius + this.image.height / 2;

    if (distance > maxDistance) {
      const nx: number = dx / distance;
      const ny: number = dy / distance;

      this.position.x = mapCenter.x + nx * maxDistance - this.image.width / 2;

      this.position.y = mapCenter.y + ny * maxDistance - this.image.height / 2;

      this.acceleration = 0;
    }
  }

  /**
   * check colliding met de sun
   *
   * @param sun planet sun
   * @returns false or true base on of player colliding with sun
   * */
  public isCollidingWithSun(sun: Planet): boolean {
    return this.getPosition().distanceTo(sun.getPosition()) -
      (this.playerRadius + sun.getHeight() / 2 - 120) <= 0;
  }

  /**
   * handle and show flame base on user input
   *
   * @param keyListener  keyListener gwn
   * */
  public processInput(keyListener: KeyListener): void {
    this.setShowFlame(false);

    if (keyListener.isKeyDown(KeyListener.KEY_UP) || keyListener.isKeyDown(KeyListener.KEY_W)) {
      this.moveType = 'accelerate';
      this.setShowFlame(true);
    }

    if (keyListener.isKeyDown(KeyListener.KEY_LEFT) || keyListener.isKeyDown(KeyListener.KEY_A)) {
      this.turnDirection = 'left';
    }

    if (keyListener.isKeyDown(KeyListener.KEY_DOWN) || keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.moveType = 'brake';
    }

    if (keyListener.isKeyDown(KeyListener.KEY_RIGHT) || keyListener.isKeyDown(KeyListener.KEY_D)) {
      this.turnDirection = 'right';
    }
  }

  /**
   * render
   *
   * @param canvas canvas to draw on
   * @param angle the side that the player locks at
   * @param cameraX view x
   * @param cameraY view y
   * */
  public override render(
    canvas: HTMLCanvasElement,
    angle?: number,
    cameraX: number = 0,
    cameraY: number = 0,
  ): void {
    CanvasRenderer.drawImage(
      canvas,
      this.image,
      this.position.x - cameraX - this.image.width / 2,
      this.position.y - cameraY - this.image.height / 2,
      angle,
    );
  }

  public getSBucks(): number {
    return this.sBucks;
  }

  public setSBucks(bucks: number): void {
    this.sBucks = bucks;
  }

  public getPlanetToGo(): string | undefined {
    return this.planetToGo;
  }

  public getAcceleration(): number {
    return this.acceleration;
  }

  /**
   * Checks if on correct planet
   * @returns if is on correct planet
   */
  public isOnCorrectPlanet(): boolean {
    return this.onCorrectPlanet;
  }

  public setOnCorrectPlanet(onRightPlanet: boolean): void {
    this.onCorrectPlanet = onRightPlanet;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public getFlame(): Flame {
    return this.flame;
  }

  public setPlanetToGo(planet: string): void {
    this.planetToGo = planet;
  }

  public setShowFlame(value: boolean): void {
    this.showFlame = value;
  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public getRocketSkin(): string {
    return this.rocketSkin;
  }
}
