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
  const imagePath = `../../assets/${this.name}.png`;
  this.image = CanvasRenderer.loadNewImage(imagePath);

  this.image.onload = (): void => {
    const offsetX = this.name === 'Sun'
      ? this.middelpoint.x - this.image.width / 2
      : this.middelpoint.x - this.orbitRadius - this.image.width / 2;

    const offsetY = this.middelpoint.y - this.image.height / 2;

    this.position = new Vector2(offsetX, offsetY);
  };
}

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.position.x, this.position.y);
    CanvasRenderer.drawCircle(canvas, this.middelpoint.x, this.middelpoint.y, this.orbitRadius, 'rgba(211, 211, 211, 0.15)');
  }
}
