import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Planet extends MovingItem {
  private name: string;

  private size: number;

  private orbitRadius: number;

  private middelpoint: Vector2;

  public constructor(middlepoint: Vector2, name: string, size: number, orbitRadius: number) {
    super();
    this.name = name;
    this.size = size;
    this.orbitRadius = orbitRadius;
    this.middelpoint = middlepoint;
    this.orbitRadius = orbitRadius;
    this.setPlanetImage();
  }

  /**
   * updates planet
   * @param delta time elapsed
   */
  public override update(delta: number): void {

  }

  /**
   * moves the planet
   * @param position postion of the planet
   */
  public override move(position: Vector2): void {

  }

  public setPlanetImage(): void {
    if (this.name === 'Sun') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Sun.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Mercury') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Mercury.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Venus') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Venus.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Earth') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Earth.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Mars') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Mars.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Jupiter') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Jupiter.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Saturn') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Saturn.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Uranus') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Uranus.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    } else if (this.name === 'Neptune') {
      this.image = CanvasRenderer.loadNewImage('../../assets/Neptune.png');
      this.image.onload = (): void => {
        this.position = new Vector2(this.middelpoint.x - this.orbitRadius - this.image.width/2, this.middelpoint.y - this.image.height/2);
      };
    }
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.position.x, this.position.y);
    CanvasRenderer.drawCircle(canvas, this.middelpoint.x, this.middelpoint.y, this.orbitRadius, 'green');
  }
}
