import CanvasRenderer from '../rendering/CanvasRenderer.js';

export default class NotificationManager {
  private currentText: string = '';

  private currentType: string = '';

  private startTime: number = 0;

  private duration: number = 0;

  /**
   * Shows a notification
   * @param text Text shown in notification
   * @param type Type of notification as string
   * @param duration Duration of notifiation
   */
  public show(text: string, type: string, duration: number = 3000): void {
    if (this.currentText === text) {
      return;
    }

    this.currentText = text;
    this.currentType = type;
    this.startTime = performance.now();
    this.duration = duration;
  }

  /**
   * Updates and renders notification
   */
  public updateAndRender(canvas: HTMLCanvasElement): void {
    const now: number = performance.now();
    const elapsed: number = now - this.startTime;

    if ((this.currentType === 'info' && elapsed > this.duration)) {
      this.clear();
      return;
    }

    if (this.currentType === 'warning' && elapsed > this.duration) {
      this.clear();
      return;
    }

    this.render(canvas, now);
  }

  private render(canvas: HTMLCanvasElement, now: number): void {
    let alpha: number = 1;
    if (this.currentType === 'warning') {
      alpha = 0.5 + Math.sin(now / 400) * 0.5;
    }

    CanvasRenderer.writeText(canvas, this.currentText, canvas.width / 2, 150, 'center', 'Arial', 30, NotificationManager.getColor(this.currentType, alpha));
  }

  private static getColor(type: string, alpha: number): string {
    if (type === 'warning') {
      return `rgba(255, 0, 0, ${alpha})`;
    } else {
      return `rgba(0, 255, 255, ${alpha})`;
    }
  }

  private clear(): void {
    this.currentText = '';
    this.currentType = '';
    this.startTime = 0;
    this.duration = 0;
  }
}
