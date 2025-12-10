import KeyListener from '../../KeyListener.js';
import CanvasRenderer from '../../CanvasRenderer.js';
import MouseListener from '../../MouseListener.js';
import Planet from '../Planet.js';
import Scene from './Scene.js';
import LevelOneScene from './LevelOneScene.js';
import Player from '../Player.js';
import Question from "../Question";

export default class OnPlanetScene extends Scene {
  protected Onplanet: Planet;

  protected showSuccessMessage: boolean = false;

  protected showFailureMessage: boolean = false;

  public constructor(canvas: HTMLCanvasElement, player: Player, planet: Planet) {
    super(canvas, player);
    this.Onplanet = planet;
  }

  /**
   * update the scene
   *  @param delta time in ms elapsed from the GameLoop
   * */
  public override update(delta: number): void {

  }

  /**
   * process input for the scene
   *  @param keyListener the keylistener to get input from
   * */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    const key: string = 'Key' + this.Onplanet.getQuestions()[0]?.getGoodAnswer().toString();
    if(keyListener.keyPressed(key)){
      this.player.setSBucks(this.player.getSBucks() + 100);
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.nextScene = new LevelOneScene(this.getCanvas(), this.player);
      }, 2000);
    }
    if(keyListener.keyPressed(KeyListener.KEY_B) || keyListener.keyPressed(KeyListener.KEY_C)){
      this.showFailureMessage = true;
      setTimeout(() => {
        this.nextScene = new LevelOneScene(this.getCanvas(), this.player);
      }, 2000);
    }
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.showSuccessMessage) {
      CanvasRenderer.drawMessage(canvas, 'Goed gedaan! +100 Bucks', 'green');
    } else if (this.showFailureMessage) {
      CanvasRenderer.drawMessage(canvas, 'Helaas fout antwoord', 'red');
    } else {
      const questions: Question[] = this.Onplanet.getQuestions();

      CanvasRenderer.writeText(canvas, `${questions[0]?.getTekst()}`, this.getCanvas().width / 2 + 50, 300, 'center', 'sans-serif', 100);
      CanvasRenderer.writeText(canvas, `A. ${questions[0]?.getAnswers()[0]}  -  B. ${questions[0]?.getAnswers()[1]}  -  C. ${questions[0]?.getAnswers()[2]}`, this.getCanvas().width / 2 + 50, 400, 'center', 'sans-serif', 50, 'white');
    }
  }
}
