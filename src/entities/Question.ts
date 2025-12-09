export default class Question {
  private tekst: string;

  private goedAnswer: string;

  private answers: string[];

  public constructor(tekst: string, rightAnswer: string, answers: string[]) {
    this.tekst = tekst;
    this.goedAnswer = rightAnswer;
    this.answers = answers;
  }

  public getTekst(): string {
    return this.tekst;
  }

  public getGoedAnswer(): string {
    return this.goedAnswer;
  }

  public getAnswers(): string[] {
    return this.answers;
  }
}
