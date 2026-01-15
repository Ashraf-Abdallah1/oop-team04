import KeyListener from '../../input/KeyListener.js';
import CanvasRenderer from '../../rendering/CanvasRenderer.js';
import MouseListener from '../../input/MouseListener.js';
import Planet from '../movingItems/Planet.js';
import Scene from './Scene.js';
import LevelOneScene from './level/LevelOneScene.js';
import Player from '../movingItems/Player.js';
import Question from '../Question.js';
import Alien from '../Alien.js';
import LevelTwoScene from './level/LevelTwoScene.js';


export default class OnPlanetScene extends Scene {
  protected onPlanet: Planet;

  protected hasNextPlanet: boolean = true;

  protected showSuccessMessage: boolean = false;

  protected showFailureMessage: boolean = false;

  protected levelOneScene: LevelOneScene;

  protected levelTwoScene: LevelTwoScene | undefined;

  protected planetImage: HTMLImageElement;

  public constructor(
    canvas: HTMLCanvasElement,
    player: Player,
    planet: Planet,
    alien: Alien,
    levelOneScene: LevelOneScene,
    levelTwoScene ?: LevelTwoScene,
  ) {
    super(canvas, player, alien);
    this.onPlanet = planet;
    this.levelOneScene = levelOneScene;
    this.levelTwoScene = levelTwoScene;

    this.planetImage = new Image();
    this.planetImage = CanvasRenderer.loadNewImage(`../../../assets/planets/onPlanet/On${planet.getName()}.png`);
    this.assignNextPlanet();
  }

  private assignNextPlanet(): void {
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
    const canvas: HTMLCanvasElement = this.getCanvas();
    const centerX: number = canvas.width / 2;

    const popupHeight: number = 220;
    const popupY: number = canvas.height / 2 - popupHeight / 2;

    const buttonWidth: number = 260;
    const buttonHeight: number = 56;
    const buttonX: number = centerX - buttonWidth / 2;
    const buttonY: number = popupY + popupHeight - buttonHeight - 24;

    const mousePos: { x: number; y: number }
    = mouseListener.getMousePosition();
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
   * get the right question based on Level
   *
   * @returns Question or undefined
   * */
  public getQuestion(): Question | undefined {
    let firstQuestion: Question | undefined;
    const questions: Question[] = this.onPlanet.getQuestions();
    if(this.player.getLevel() === 1) {
      firstQuestion = questions[0];
    }else if(this.player.getLevel() === 2){
      firstQuestion = questions[1];
    }
    return firstQuestion;
  }

  /**
   * get description of the planet to go to
   *
   * @returns description of the planet
   * */
  public getPlanetDescription(): string {
    let planetDescription: string = '';
    this.planets.forEach((planet: Planet) => {
      if (this.player.getPlanetToGo() == planet.getName()) {
        planetDescription = planet.getDescription();
      }
    });
    return planetDescription;
  }

  /**
 * level two setup
 * */
  public initializeLevelTwo(): void {
    this.player.setLevel(2);
    this.alien.setPlanetsToGo(['Mercury', 'Neptune', 'Uranus', 'Mars', 'Venus', 'Jupiter', 'Saturn']);
    this.assignNextPlanet();
    this.levelOneScene.clearScene();
    this.nextScene = this.levelOneScene;
    this.hasNextPlanet = true;
  }

  /**
   * Renders al of elements in level1 on the canvas
   *
   * @param canvas the canvas to render on
   * */
  public override render(canvas: HTMLCanvasElement): void {
    const centerX: number = canvas.width / 2;
    const canvasHeight: number = canvas.height;

    CanvasRenderer.drawImage(canvas, this.planetImage, 0, canvasHeight - canvas.height / 3);

    if (this.player.isOnCorrectPlanet()) {
      if (this.hasNextPlanet) {
        if (this.showSuccessMessage) {
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
            20,
            'rgba(0, 0, 0, 0.5)',
            'rgba(0, 0, 0, 0)'
          );

          CanvasRenderer.drawTextWithShadow(
            canvas,
            `Locatie: ${this.onPlanet.getName()}`,
            centerX,
            headerY + headerHeight / 2 - 30,
            18,
            '#FFFFFF',
            'sans-serif',
            'center'
          );
          this.alien.setDelivered();

          if (this.alien.getDelivered()) {
            const firstQuestion: Question | undefined = this.getQuestion();
            if (firstQuestion) {
              const speechBubbleY: number = 200;
              const speechBubbleWidth: number = 500;
              const speechBubbleHeight: number = 100;
              const speechBubbleX: number = centerX - 250;

              // Instellingen voor het Mission Paneel
              const cardWidth: number = 900;
              const cardHeight: number = 120;
              const cardX: number = canvas.width - cardWidth - 200;
              const cardY: number = 65;

              CanvasRenderer.drawRoundedRect(
                canvas,
                cardX,
                cardY,
                cardWidth,
                cardHeight,
                20,
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.2)'
              );

              CanvasRenderer.drawTextWithShadow(
                canvas,
                'MISSIE STATUS',
                cardX + cardWidth / 2,
                cardY + 30,
                14,
                '#4ECDC4',
                'Arial',
                'center'
              );

              CanvasRenderer.drawTextWithShadow(
                canvas,
                'Volgende stop:',
                cardX + cardWidth / 2,
                cardY + 65,
                18,
                '#FFFFFF',
                'Arial',
                'center'
              );
              if (this.player.getLevel() === 1) {
                CanvasRenderer.drawTextWithShadow(
                  canvas,
                  `${this.player.getPlanetToGo()}?`,
                  cardX + cardWidth / 2,
                  cardY + 95,
                  22,
                  '#FFD93D',
                  'Arial',
                  'center'
                );
              } else {
                const planetDescription: string = this.getPlanetDescription();

                CanvasRenderer.drawTextWithShadow(
                  canvas,
                  `${planetDescription}?`,
                  cardX + cardWidth / 2,
                  cardY + 95,
                  22,
                  '#FFD93D',
                  'Arial',
                  'center'
                );
              }


              CanvasRenderer.drawSpeechBubble(
                canvas,
                speechBubbleX,
                speechBubbleY,
                speechBubbleWidth,
                speechBubbleHeight,
                '#FFFFFF',
                firstQuestion.getTekst(),
              );

              const instructionY: number = 380;
              CanvasRenderer.writeText(
                canvas,
                'Klik a, b of c op het toetsenbord om antwoord te geven.',
                centerX,
                instructionY,
                'center',
                'Arial',
                16,
                'rgba(255, 255, 255, 0.8)'
              );

              const answers: string[] = firstQuestion.getAnswers();
              const letters: string[] = ['A', 'B', 'C'];

              const idleButtonColor: string = 'rgba(255, 255, 255, 0.2)';
              const buttonWidth: number = 450;
              const buttonHeight: number = 55;
              const buttonSpacing: number = 15;
              const startY: number = 420;

              answers.forEach((answer: string, index: number) => {
                const buttonX: number = centerX - buttonWidth / 2;
                const buttonY: number = startY + index * (buttonHeight + buttonSpacing);
                const letter: string = letters[index] ?? '';

                CanvasRenderer.drawAnswerButton(
                  canvas,
                  buttonX,
                  buttonY,
                  buttonWidth,
                  buttonHeight,
                  letter,
                  answer,
                  idleButtonColor, // Alle buttons nu dezelfde rustige kleur
                  false,
                );
              });
            }
          }
        }
      } else {
        const level: number = this.player.getLevel();
        if(level < 2){
          CanvasRenderer.drawMessage(canvas, `Level: ${this.player.getLevel() + 1}💪`, '#2196F3');
        } else {
          //max 12
          const countCorrectAnswers: number = this.player.getSBucks() /100;
          if(countCorrectAnswers > 6 ){
            CanvasRenderer.drawMessage(canvas, `Goed Gedaan  ${countCorrectAnswers} vragen zijn goed`, '#2196F3', 1000);
          } else{
            CanvasRenderer.drawMessage(canvas, `Kan beter, ${countCorrectAnswers} vragen zijn goed van 12 `, '#2196F3', 1000);
          }
          return;
        }

        setTimeout(() => {
          this.initializeLevelTwo();
        }, 3000);
      }
    } else {
      if (this.player.getPlanetToGo() !== null) {
        CanvasRenderer.drawRectangle(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          'rgba(0, 0, 0, 0.6)'
        );

        const popupWidth: number = 840;
        const popupHeight: number = 220;
        const popupX: number = centerX - popupWidth / 2;
        const popupY: number = canvas.height / 2 - popupHeight / 2;

        CanvasRenderer.drawRoundedRect(
          canvas,
          popupX,
          popupY,
          popupWidth,
          popupHeight,
          20,
          '#1E1E2E',
          'rgba(0, 0, 0, 0.5)'
        );

        CanvasRenderer.drawTextWithShadow(
          canvas,
          `Dit is niet de juiste planeet. Je moet naar ${this.player.getPlanetToGo()}, maar je bent nu op ${this.onPlanet.getName()}.`,
          centerX,
          popupY + 90,
          21,
          '#FFFFFF',
          'Arial',
          'center'
        );

        const buttonWidth: number = 260;
        const buttonHeight: number = 56;
        const buttonX: number = centerX - buttonWidth / 2;
        const buttonY: number = popupY + popupHeight - buttonHeight - 18;

        CanvasRenderer.drawRoundedRect(
          canvas,
          buttonX,
          buttonY,
          buttonWidth,
          buttonHeight,
          12,
          '#A83DC2',
          'rgba(0, 0, 0, 0.45)'
        );
        CanvasRenderer.drawTextWithShadow(
          canvas,
          'Verder zoeken',
          centerX,
          buttonY + buttonHeight / 2 + 6,
          19,
          '#FFFFFF',
          'Arial',
          'center'
        );
      }
    }
  }
}
