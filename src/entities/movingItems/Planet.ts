import MovingItem from './MovingItem.js';
import Vector2 from '../../utils/Vector2.js';
import CanvasRenderer from '../../rendering/CanvasRenderer.js';
import Question from '../Question.js';

export default class Planet extends MovingItem {
  private readonly name: string;

  private readonly description: string;

  private readonly orbitRadius: number;

  private midpoint: Vector2;

  private rotation: number;

  private readonly question: Question[];

  private readonly interactionKeyE: HTMLImageElement;

  private showInteractionKey: boolean;

  private readonly pointOfInterest: HTMLImageElement;

  private showPointOfIntrest: boolean;

  public constructor(
    midpoint: Vector2,
    name: string,
    description: string,
    orbitRadius: number,
    speed: number,
    question: Question[],
  ) {
    super();
    this.name = name;
    this.description = description;
    this.orbitRadius = orbitRadius;
    this.midpoint = midpoint;
    this.question = [];
    this.setPlanetImage();
    this.rotation = Math.random() * 2;
    this.speed = speed;
    this.question = question;
    this.showInteractionKey = false;
    this.interactionKeyE = CanvasRenderer.loadNewImage('assets/interaction/InteractionKeyE.png');
    this.showPointOfIntrest = false;
    this.pointOfInterest = CanvasRenderer.loadNewImage('assets/interaction/PointOfInterest.png');
  }

  /**
   * updates planet
   * @param delta time elapsed
   */
  public override update(delta: number): void {
    this.move(delta);
    //todo add rotate
    //todo add moon
  }

  /**
   * moves the planet
   * @param delta time in ms
   */
  protected override move(delta: number): void {
    if (this.name !== 'Sun') {
      this.position.x = this.midpoint.x + this.orbitRadius * Math.sin(this.rotation * Math.PI);
      this.position.y = this.midpoint.y + this.orbitRadius * Math.cos(this.rotation * Math.PI);

      this.rotation += this.speed * delta;
    }
  }

  public setPlanetImage(): void {
    this.image = CanvasRenderer.loadNewImage(`../assets/planets/${this.name}.png`);

    this.image.onload = (): void => {
      this.position = new Vector2(
        this.midpoint.x + this.orbitRadius,
        this.midpoint.y
      );
    };
  }

  /**
   * Renders the planet on the canvas with camera offset
   * @param canvas the canvas to render on
   * @param cameraX the camera x offset
   * @param cameraY the camera y offset
   */
  public override render(
    canvas: HTMLCanvasElement,
    cameraX: number = 0,
    cameraY: number = 0,
  ): void {
    CanvasRenderer.drawCircle(canvas, this.midpoint.x - cameraX, this.midpoint.y - cameraY, this.orbitRadius, 'rgba(211, 211, 211, 0.15)');

    CanvasRenderer.drawImage(canvas, this.image, this.position.x - this.image.width / 2 - cameraX,
      this.position.y - this.image.height / 2 - cameraY);

    if (this.showInteractionKey && this.name !== 'Sun') {
      CanvasRenderer.drawImage(canvas, this.interactionKeyE,
        this.position.x + this.image.width / 2 - cameraX,
        this.position.y - 5 - this.image.width / 2 - cameraY);
    }

    if (this.showPointOfIntrest && this.name !== 'Sun') {
      CanvasRenderer.drawImage(canvas, this.pointOfInterest,
        this.position.x - this.image.width / 2 - cameraX,
        this.position.y - this.image.height / 2 - cameraY);
    }
  }

  public setShowInteractionKey(state: boolean): void {
    this.showInteractionKey = state;
  }

  public setShowPointOfInterest(state: boolean): void {
    this.showPointOfIntrest = state;
  }

  public getQuestions(): Question[] {
    return this.question;
  }

  public getName(): string {
    return this.name;
  }

  public getOrbitRadius(): number {
    return this.orbitRadius;
  }

  public getRenderPointOfInterestKey(): boolean {
    return this.showPointOfIntrest;
  }

  public getDescription(): string{
    return this.description;
  }
}
