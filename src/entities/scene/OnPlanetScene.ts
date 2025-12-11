import KeyListener from '../../KeyListener.js';
import CanvasRenderer from '../../CanvasRenderer.js';
import MouseListener from '../../MouseListener.js';
import Planet from '../Planet.js';
import Scene from './Scene.js';
import LevelOneScene from './LevelOneScene.js';
import Player from '../Player.js';
import Question from '../Question.js';

export default class OnPlanetScene extends Scene {
  protected onPlanet: Planet;

  protected showSuccessMessage: boolean = false;

  protected showFailureMessage: boolean = false;

  public constructor(canvas: HTMLCanvasElement, player: Player, planet: Planet) {
    super(canvas, player);
    this.onPlanet = planet;
  }

  /**
   * update the scene
   *  @param delta time in ms elapsed from the GameLoop
   * */
  public override update(delta: number): void {
    const planets: string[] = this.alien.getPlanetsToGo();
    if (planets.length === 0) {
      return;
    }

    const randomIndex: number = Math.floor(Math.random() * planets.length);

    const nextPlanetName: string | undefined = planets.splice(randomIndex, 1)[0];

    if (nextPlanetName) {
      this.player.setPlanetToGo(nextPlanetName);
    }
  }

  /**
   * process input for the scene
   *  @param keyListener the keylistener to get input from
   *  @param mouseListener the mouseListener to get input from
   * */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    const key: string = 'Key' + this.onPlanet.getQuestions()[0]?.getGoodAnswer().toString();
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

    const mousePos: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const buttonX: number = this.getCanvas().width / 2 - 75;
    const buttonY: number = this.getCanvas().height / 2 + 200;
    const buttonWidth: number = 150;
    const buttonHeight: number = 50;

    const insideX: boolean = mousePos.x >= buttonX && mousePos.x <= buttonX + buttonWidth;
    const insideY: boolean = mousePos.y >= buttonY && mousePos.y <= buttonY + buttonHeight;
    const insideButton: boolean = insideX && insideY;

    if (clicked && insideButton) {
      this.nextScene = new LevelOneScene(this.getCanvas(), this.player);
    }
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public override render(canvas: HTMLCanvasElement): void {
    if(this.player.isOnCorrectPlanet()){
      CanvasRenderer.writeText(canvas, 'dit is de goede planet', this.getCanvas().width / 2 + 50, 500, 'center', 'sans-serif', 80);
      this.alien.setDelivered();
    } else{
      if(this.player.getPlanetToGo() !== null){
        CanvasRenderer.writeText(canvas, 'Dit is niet de goede planet', this.getCanvas().width / 2 + 50, 450, 'center', 'sans-serif', 30);
      }
    }
    if (this.showSuccessMessage) {
      CanvasRenderer.drawMessage(canvas, 'Goed gedaan! +100 Bucks', 'green');
    } else if (this.showFailureMessage) {
      CanvasRenderer.drawMessage(canvas, 'Helaas fout antwoord', 'red');
    } else {
      this.alien.render(canvas);

      CanvasRenderer.writeText(canvas, `Je bent geland op ${this.onPlanet.getName()}`, this.getCanvas().width / 2 + 50, 100, 'center', 'sans-serif', 80);

      CanvasRenderer.writeText(canvas, `kan je mij nu brengen naar ${this.player.getPlanetToGo()}`, this.getCanvas().width / 2 + 50, 250, 'center', 'sans-serif', 50, 'white');

      CanvasRenderer.drawButton(canvas, this.getCanvas().width / 2 - 75, this.getCanvas().height / 2 + 200, 300, 80, 'klik om door te gaan', 'white', 'black');

      if(this.alien.getDelivered()){
        const questions: Question[] = this.onPlanet.getQuestions();
        CanvasRenderer.writeText(canvas, `${questions[0]?.getTekst()}`, this.getCanvas().width / 2 + 50, 600, 'center', 'sans-serif', 100);
        CanvasRenderer.writeText(canvas, `A. ${questions[0]?.getAnswers()[0]}  -  B. ${questions[0]?.getAnswers()[1]}  -  C. ${questions[0]?.getAnswers()[2]}`, this.getCanvas().width / 2 + 50, 700, 'center', 'sans-serif', 50, 'white');
      }
    }
  }
}
