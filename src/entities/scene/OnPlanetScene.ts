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
    if(keyListener.keyPressed(key)) {
      this.player.setSBucks(this.player.getSBucks() + 100);
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.nextScene = new LevelOneScene(this.getCanvas(), this.player);
      }, 2000);
    } else if(
      keyListener.keyPressed(KeyListener.KEY_B) ||
      keyListener.keyPressed(KeyListener.KEY_C) ||
      keyListener.keyPressed(KeyListener.KEY_A)) {
      this.showFailureMessage = true;
      setTimeout(() => {
        this.nextScene = new LevelOneScene(this.getCanvas(), this.player);
      }, 2000);
    }

    const mousePos: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const buttonX: number = this.getCanvas().width / 2 - 75;
    const buttonY: number = 220;
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
    const centerX: number = canvas.width / 2;
    const canvasHeight: number = canvas.height;

    if (this.showSuccessMessage) {
      // Success message with stars
      CanvasRenderer.drawMessage(canvas, 'Goed gedaan! +100 Bucks', '#4CAF50');

      const starPositions: Array<{ x: number; y: number; size: number }> = [
        { x: centerX - 200, y: 100, size: 30 },
        { x: centerX + 200, y: 120, size: 25 },
        { x: centerX - 150, y: canvasHeight - 150, size: 35 },
        { x: centerX + 180, y: canvasHeight - 100, size: 28 }
      ];

      starPositions.forEach((star: { x: number; y: number; size: number }) => {
        CanvasRenderer.drawStar(canvas, star.x, star.y, 5, star.size, star.size / 2, '#FFD700');
      });
    } else if (this.showFailureMessage) {
      CanvasRenderer.drawMessage(canvas, 'Helaas fout antwoord', '#F44336');
    } else {
      this.alien.render(canvas);

      const headerY: number = 50;
      const headerWidth: number = 600;
      const headerHeight: number = 60;
      const headerX: number = centerX - headerWidth / 2;

      CanvasRenderer.drawRoundedRect(
        canvas,
        headerX,
        headerY,
        headerWidth,
        headerHeight,
        15,
        '#2196F3',
        'rgba(0, 0, 0, 0.3)'
      );

      CanvasRenderer.drawTextWithShadow(
        canvas,
        `Je bent geland op ${this.onPlanet.getName()}`,
        centerX,
        headerY + headerHeight / 2,
        28,
        '#FFFFFF',
        'Arial',
        'center',
        'rgba(0, 0, 0, 0.5)'
      );

      if (this.player.isOnCorrectPlanet()) {
        const successBoxY: number = 180;
        const successBoxWidth: number = 300;
        const successBoxHeight: number = 50;
        const successBoxX: number = centerX + 300;

        CanvasRenderer.drawRoundedRect(
          canvas,
          successBoxX,
          successBoxY,
          successBoxWidth,
          successBoxHeight,
          12,
          '#4CAF50',
          'rgba(0, 0, 0, 0.2)'
        );

        CanvasRenderer.drawTextWithShadow(
          canvas,
          'Dit is de goede planeet!',
          centerX + 450,
          200,
          24,
          '#FFFFFF',
          'Arial',
          'center'
        );

        this.alien.setDelivered();
      } else {
        if (this.player.getPlanetToGo() !== null) {
          const warningBoxY: number = 180;
          const warningBoxWidth: number = 350;
          const warningBoxHeight: number = 50;
          const warningBoxX: number = centerX + 300;

          CanvasRenderer.drawRoundedRect(
            canvas,
            warningBoxX,
            warningBoxY,
            warningBoxWidth,
            warningBoxHeight,
            12,
            '#FF9800',
            'rgba(0, 0, 0, 0.2)'
          );

          CanvasRenderer.drawTextWithShadow(
            canvas,
            'Dit is niet de goede planeet',
            centerX + 480,
            200,
            24,
            '#FFFFFF',
            'Arial',
            'center'
          );

          const buttonY: number = 220;
          const buttonWidth: number = 300;
          const buttonHeight: number = 60;
          const buttonX: number = centerX - buttonWidth / 2;

          CanvasRenderer.drawRoundedRect(
            canvas,
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            15,
            '#9C27B0',
            'rgba(0, 0, 0, 0.3)'
          );

          CanvasRenderer.drawTextWithShadow(
            canvas,
            'Klik om door te gaan',
            centerX,
            buttonY + buttonHeight / 2,
            22,
            '#FFFFFF',
            'Arial',
            'center'
          );
        }
      }

      const speechBubbleY: number = 150;
      const speechBubbleWidth: number = 550;
      const speechBubbleHeight: number = 70;
      const speechBubbleX: number = centerX - speechBubbleWidth / 2;

      CanvasRenderer.drawSpeechBubble(
        canvas,
        speechBubbleX,
        speechBubbleY,
        speechBubbleWidth,
        speechBubbleHeight,
        '#FFFFFF',
        `Kan je mij brengen naar ${this.player.getPlanetToGo()}?`
      );

      if (this.alien.getDelivered()) {
        const questions: Question[] = this.onPlanet.getQuestions();
        const firstQuestion: Question | undefined = questions[0];

        if (firstQuestion) {
          const questionBoxY: number = 280;
          const questionBoxWidth: number = 700;
          const questionBoxHeight: number = 80;
          const questionBoxX: number = centerX - questionBoxWidth / 2;

          CanvasRenderer.drawRoundedRect(
            canvas,
            questionBoxX,
            questionBoxY,
            questionBoxWidth,
            questionBoxHeight,
            15,
            '#673AB7',
            'rgba(0, 0, 0, 0.3)'
          );

          CanvasRenderer.drawTextWithShadow(
            canvas,
            firstQuestion.getTekst(),
            centerX,
            questionBoxY + questionBoxHeight / 2,
            22,
            '#FFFFFF',
            'Arial',
            'center',
            'rgba(0, 0, 0, 0.3)'
          );

          const instructionY: number = 380;
          CanvasRenderer.writeText(
            canvas,
            'Klik de letter om een antwoord te kiezen',
            centerX,
            instructionY,
            'center',
            'Arial',
            16,
            'rgba(255, 255, 255, 0.8)'
          );

          // Answer buttons
          const answers: string[] = firstQuestion.getAnswers();
          const letters: string[] = ['A', 'B', 'C'];
          const buttonColors: string[] = ['#FF6B6B', '#4ECDC4', '#FFD93D'];
          const buttonWidth: number = 400;
          const buttonHeight: number = 60;
          const buttonSpacing: number = 20;
          const startY: number = 420;

          answers.forEach((answer: string, index: number) => {
            const buttonX: number = centerX - buttonWidth / 2;
            const buttonY: number = startY + index * (buttonHeight + buttonSpacing);

            const letter: string = letters[index] ?? '';
            const button: string = buttonColors[index] ?? '';
            CanvasRenderer.drawAnswerButton(
              canvas,
              buttonX,
              buttonY,
              buttonWidth,
              buttonHeight,
              letter,
              answer,
              button,
              false
            );
          });
        }
      }
    }
  }
}
