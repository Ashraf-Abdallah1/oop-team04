export default class Question {
  private readonly tekst: string;

  private readonly goodAnswer: string;

  private readonly answers: string[];

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
