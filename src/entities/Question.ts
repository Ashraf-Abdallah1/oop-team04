export default class Question {
  private tekst: string;

  private goodAnswer: string;

  private answers: string[];

  public constructor(tekst: string, rightAnswer: string, answers: string[]) {
    this.tekst = tekst;
    this.goodAnswer = rightAnswer;
    this.answers = answers;
  }

  public getTekst(): string {
    return this.tekst;
  }

  public getGoodAnswer(): string {
    return this.goodAnswer;
  }

  public getAnswers(): string[] {
    return this.answers;
  }
}
