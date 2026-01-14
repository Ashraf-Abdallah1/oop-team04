import KeyListener from '../../../input/KeyListener.js';
import SceneLevel from './SceneLevel.js';
import Player from '../../movingItems/Player.js';
import Alien from '../../Alien.js';
import Planet from '../../movingItems/Planet';
import OnPlanetScene from '../OnPlanetScene.js';

export default class LevelOneScene extends SceneLevel {
  public constructor(canvas: HTMLCanvasElement, player: Player, alien: Alien) {
    super(canvas, player, alien);
    this.timeToFinish = 500000;
  }

  /**
   * clear next scene
   */
  public override clearScene(): void {
    this.nextScene = null;
  }

  /**
   * update method
   * @param delta time elapsed
   */
  public override update(delta: number): void {
    if(this.timeToFinish > 0){
      this.timeToFinish -= delta;
      if(this.timeToFinish <= 0){
        return;
      }
    }

    this.closestPlanetData = this.getClosestPlanet();
    const closestPlanet: Planet | null = this.closestPlanetData.planet;
    const closestDistance: number = this.closestPlanetData.distance;

    if (this.isMarioEffectActive && closestPlanet) {
      this.marioRadius -= this.marioRadius / 200 * delta;
      if (this.marioRadius <= 1) {
        this.marioRadius = 0;

        this.nextScene = new OnPlanetScene(
          this.getCanvas(),
          this.player,
          closestPlanet,
          this.alien,
          this,
        );

        this.isMarioEffectActive = false;
      }
    } else {
      this.player.update(delta);

      this.planets.forEach((planet: Planet) => {
        planet.update(delta);
        planet.setShowInteractionKey(false);
        planet.setShowPointOfInterest(false);

        if (planet.getName() === this.player.getPlanetToGo() && this.player.getLevel() === 1) {
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
   * process user input
   * @param keyListener the keylisener
   * @param mouseListener the mouseListener
   * @returns the next scene
   * */
  public override processInput(keyListener: KeyListener): void {
    super.processInput(keyListener);
  }
}
