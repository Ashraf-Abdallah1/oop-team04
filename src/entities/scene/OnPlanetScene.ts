import KeyListener from '../../KeyListener.js';
import CanvasRenderer from '../../CanvasRenderer.js';
import Planet from '../Planet.js';
import Scene from './Scene.js';
import LevelOneScene from './LevelOneScene.js';
import Player from '../Player.js';

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
  public override processInput(keyListener: KeyListener): void {
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

    if(this.showSuccessMessage){
      CanvasRenderer.writeText(this.getCanvas(), 'goed gedaan 100s bucks', this.getCanvas().width / 2 + 50, 300, 'center', 'sans-serif', 100);
    } else if(this.showFailureMessage){
      CanvasRenderer.writeText(this.getCanvas(), 'helaas fout antwoord', this.getCanvas().width / 2 + 50, 300, 'center', 'sans-serif', 100);
    }else {
      const quistion: string|undefined =this.Onplanet.getQuestions()[0]?.getTekst();
      const answer1: string|undefined = this.Onplanet.getQuestions()[0]?.getAnswers()[0];
      const answer2: string|undefined = this.Onplanet.getQuestions()[0]?.getAnswers()[1];
      const answer3: string|undefined = this.Onplanet.getQuestions()[0]?.getAnswers()[2];

      CanvasRenderer.writeText(canvas, `${quistion}`, this.getCanvas().width / 2 + 50, 300, 'center', 'sans-serif', 100);
      CanvasRenderer.writeText(canvas, `A.${answer1}  -  B.${answer2}  -  C.${answer3}`, this.getCanvas().width / 2 + 50, 400, 'center', 'sans-serif', 50, 'white');
    }
  }
}
