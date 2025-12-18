import KeyListener from '../../input/KeyListener.js';
import CanvasRenderer from '../../rendering/CanvasRenderer.js';
import MouseListener from '../../input/MouseListener.js';
import Planet from '../movingItems/Planet.js';
import Scene from './Scene.js';
import LevelOneScene from './level/LevelOneScene.js';
import Player from '../movingItems/Player.js';
import Question from '../Question.js';
import Alien from '../Alien.js';


export default class OnPlanetScene extends Scene {
  protected onPlanet: Planet;

  protected hasNextPlanet: boolean = true;

  protected showSuccessMessage: boolean = false;

  protected showFailureMessage: boolean = false;

  protected levelOneScene: LevelOneScene;

  public constructor(canvas: HTMLCanvasElement,
    player: Player,
    planet: Planet,
    alien: Alien,
    levelOneScene: LevelOneScene) {
    super(canvas, player, alien);
    this.onPlanet = planet;
    this.levelOneScene = levelOneScene;

    if (this.player.isOnCorrectPlanet()) {
      const planets: string[] = this.alien.getPlanetsToGo();
      let randomIndex: number = Math.floor(Math.random() * planets.length);

      let nextPlanetName: string | undefined = planets[randomIndex];

      while (this.onPlanet.getName() == nextPlanetName) {
        randomIndex = Math.floor(Math.random() * planets.length);
        nextPlanetName = planets[randomIndex];
      }
      planets.splice(randomIndex, 1);
      this.alien.setPlanetsToGo(planets);

      if (nextPlanetName) {
        this.player.setPlanetToGo(nextPlanetName);
      } else {
        this.player.setPlanetToGo('nergens');
        this.hasNextPlanet = false;
      }
    }
  }

  /**
   * process input for the scene
   *  @param keyListener the keylistener to get input from
   *  @param mouseListener the mouseListener to get input from
   * */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.checkButtonClick(keyListener);
    this.checkMouseClick(mouseListener);
  }

  /**
   * check if button clicked
   *
   * @param keyListener keyListener to listen to the mouse
   *
   * */
  public checkButtonClick(keyListener: KeyListener): void {
    const key: string = 'Key' + this.onPlanet.getQuestions()[0]?.getGoodAnswer().toString();
    if (keyListener.keyPressed(key)) {
      this.player.setSBucks(this.player.getSBucks() + 100);
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.levelOneScene.clearScene();
        this.nextScene = this.levelOneScene;
      }, 2000);
    } else if (
      keyListener.keyPressed(KeyListener.KEY_B) ||
      keyListener.keyPressed(KeyListener.KEY_C) ||
      keyListener.keyPressed(KeyListener.KEY_A)) {
      this.showFailureMessage = true;
      setTimeout(() => {
        this.levelOneScene.clearScene();
        this.nextScene = this.levelOneScene;
      }, 2000);
    }
  }

  /**
   * check if mouse clicked
   *
   * @param mouseListener MouseListener to listen to the mouse
   *
   * */
  public checkMouseClick(mouseListener: MouseListener): void {

    const centerX: number = this.getCanvas().width / 2;

    const boxY: number = 140;
    const boxHeight: number = 100;

    const buttonWidth: number = 320;
    const buttonHeight: number = 60;
    const buttonX: number = centerX - buttonWidth / 2;
    const buttonY: number = boxY + boxHeight + 30;

    const mousePos: { x: number; y: number } = mouseListener.getMousePosition();
    const clicked: boolean = mouseListener.buttonPressed();

    const insideButton: boolean =
      mousePos.x >= buttonX &&
      mousePos.x <= buttonX + buttonWidth &&
      mousePos.y >= buttonY &&
      mousePos.y <= buttonY + buttonHeight;

    if (clicked && insideButton) {
      this.levelOneScene.clearScene();
      this.nextScene = this.levelOneScene;
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

    if (this.player.isOnCorrectPlanet()) {
      if (this.hasNextPlanet) {
        if (this.showSuccessMessage) {
          // Success message with stars
          CanvasRenderer.drawMessage(canvas, 'Goed gedaan! +100 Bucks', '#4CAF50');

          const starPositions: Array<{ x: number; y: number; size: number }> = [
            {x: centerX - 200, y: 100, size: 30},
            {x: centerX + 200, y: 120, size: 25},
            {x: centerX - 150, y: canvasHeight - 150, size: 35},
            {x: centerX + 180, y: canvasHeight - 100, size: 28}
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

          this.alien.setDelivered();

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
      } else {
        CanvasRenderer.drawMessage(canvas, 'Level 1 is klaar.', '#2196F3');
      }
    } else {
      if (this.player.getPlanetToGo() !== null) {
        const boxWidth: number = 900;
        const boxHeight: number = 100;
        const boxX: number = centerX - boxWidth / 2;
        const boxY: number = 140;

        CanvasRenderer.drawRoundedRect(
          canvas,
          boxX,
          boxY,
          boxWidth,
          boxHeight,
          12,
          '#FF9800',
          'rgba(0, 0, 0, 0.2)'
        );

        CanvasRenderer.drawTextWithShadow(
          canvas,
          `Dit is niet de juiste planeet. Je moet naar de ${this.player.getPlanetToGo()}, maar je bent nu op ${this.onPlanet.getName()}.`,
          centerX,
          boxY + boxHeight / 2 + 8,
          24,
          '#FFFFFF',
          'Arial',
          'center'
        );

        const buttonWidth: number = 320;
        const buttonHeight: number = 60;
        const buttonX: number = centerX - buttonWidth / 2;
        const buttonY: number = boxY + boxHeight + 30;

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
          'Klik om verder te zoeken',
          centerX,
          buttonY + buttonHeight / 2 + 7,
          22,
          '#FFFFFF',
          'Arial',
          'center'
        );
      }
    }
  }
}
