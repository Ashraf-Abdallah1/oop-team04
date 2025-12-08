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
    this.PlanetImage();
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

  public PlanetImage(): void {
    if (this.name === 'Sun') {
      CanvasRenderer.loadNewImage('./assets/Sun.png');
    } else if (this.name === 'Mercury') {
      CanvasRenderer.loadNewImage('./assets/Mercury.png');
    } else if (this.name === 'Venus') {
      CanvasRenderer.loadNewImage('./assets/Venus.png');
    } else if (this.name === 'Earth') {
      CanvasRenderer.loadNewImage('./assets/Earth.png');
    } else if (this.name === 'Mars') {
      CanvasRenderer.loadNewImage('./assets/Mars.png');
    } else if (this.name === 'Jupiter') {
      CanvasRenderer.loadNewImage('./assets/Jupiter.png');
    } else if (this.name === 'Saturn') {
      CanvasRenderer.loadNewImage('./assets/Saturn.png');
    } else if (this.name === 'Uranus') {
      CanvasRenderer.loadNewImage('./assets/Uranus.png');
    } else if (this.name === 'Neptune') {
      CanvasRenderer.loadNewImage('./assets/Neptune.png');
    }
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawCircle(canvas, this.middelpoint.x, this.middelpoint.y, this.orbitRadius, 'green');
  }
}
