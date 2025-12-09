import MovingItem from './MovingItem.js';
import Vector2 from '../Vector2.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Question from './Question.js';

export default class Planet extends MovingItem {
  private name: string;

  private size: number;

  private orbitRadius: number;

  private middelpoint: Vector2;

  private currentAngle: number;

  private quistions: Question[];

  public constructor(
    middlepoint: Vector2,
    name: string,
    size: number,
    orbitRadius: number,
    speed: number,
  ){
    super();
    this.name = name;
    this.size = size;
    this.orbitRadius = orbitRadius;
    this.middelpoint = middlepoint;
    this.quistions = [];
    this.setPlanetImage();
    this.currentAngle = Math.random() * 2;
    this.speed = speed;
  }

  /**
   * updates planet
   * @param delta time elapsed
   */
  public override update(delta: number): void {
    if (this.name !== 'Sun') {
      this.position.x = this.middelpoint.x + this.orbitRadius * Math.sin(this.currentAngle * Math.PI);
      this.position.y = this.middelpoint.y + this.orbitRadius * Math.cos(this.currentAngle * Math.PI);

      this.currentAngle += this.speed * delta;
    }
  }

  /**
   * moves the planet
   * @param position postion of the planet
   */
  public override move(position: Vector2): void {

  }

  public setPlanetImage(): void {
    const imagePath: string = `../../assets/${this.name}.png`;
    this.image = CanvasRenderer.loadNewImage(imagePath);

    this.image.onload = (): void => {
      this.position = new Vector2(
        this.middelpoint.x + this.orbitRadius,
        this.middelpoint.y
      );
    };
  }

  public override render(canvas: HTMLCanvasElement): void {
    const drawX: number = this.position.x - this.image.width / 2;
    const drawY: number = this.position.y - this.image.height / 2;
    CanvasRenderer.drawImage(canvas, this.image, drawX, drawY);
    CanvasRenderer.drawCircle(canvas, this.middelpoint.x, this.middelpoint.y, this.orbitRadius, 'rgba(211, 211, 211, 0.15)');
  }
}
