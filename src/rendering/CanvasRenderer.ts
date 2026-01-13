/**
 * Helper utlity class for working with the HTML Canvas Element.
 *
 * @version 1.3.0
 * @author Frans Blauw
 */

export default class CanvasRenderer {
  /**
   * Get the 2D rendering context of a canvas
   *
   * @param canvas the canvas on which will be drawn
   * @returns the 2D rendering context of the canvas
   */
  private static getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('Canvas Rendering Context is null');
    }
    return ctx;
  }

  /**
   * Fill the canvas with a colour
   *
   * @param canvas canvas that requires filling
   * @param colour the colour that the canvas will be filled with
   */
  public static fillCanvas(canvas: HTMLCanvasElement, colour: string = '#FF10F0'): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colour;
    ctx.fill();
  }

  /**
   * Loads a new image into an HTMLImageElement
   * WARNING: This happens async. Therefor the result might not immediately be visible
   *
   * @param source the path of the image to be loaded
   * @returns the image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img: HTMLImageElement = new Image();
    img.src = source;
    return img;
  }

  /**
   * Draw an image on the canvas at the specified coordinates
   *
   * @param canvas that canvas that it should be drawn on
   * @param image the image to be drawn
   * @param dx x-coordinate
   * @param dy y-coordinate
   */
  public static drawImage(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    dx: number,
    dy: number,
    angle?: number
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);

    ctx.save();

    if (angle && !isNaN(angle)) {
      ctx.translate(dx + image.width / 2, dy + image.height / 2);
      ctx.rotate(angle);
      ctx.translate(-image.width / 2, -image.height / 2);
      ctx.drawImage(image, 0, 0);
    } else {
      ctx.drawImage(image, dx, dy);
    }

    ctx.restore();
  }

  /**
   * Clear the canvas, preparing for drawing
   *
   * @param canvas canvas to be cleared
   */
  public static clearCanvas(canvas: HTMLCanvasElement): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Write text on the canvas at the specified coordinates
   *
   * @param canvas Canvas to write to
   * @param text Text to write
   * @param xCoordinate x-coordinate of the text
   * @param yCoordinate y-coordinate of the text
   * @param alignment align of the text
   * @param fontFamily font family to use when writing text
   * @param fontSize font size in pixels
   * @param color colour of text to write
   */
  public static writeText(
    canvas: HTMLCanvasElement,
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    fontFamily: string = 'starjedi-fill',
    fontSize: number = 20,
    color: string = 'red',
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Function to create an instructionset all new lines divided by '-'
   * @param canvas Canvas to write to
   * @param text Text to write
   * @param xCoordinate x-coordinate of the text
   * @param yCoordinate y-coordinate of the text
   * @param alignment align of the text
   * @param fontFamily font family to use when writing text
   * @param fontSize font size in pixels
   * @param color colour of text to write
   */
  public static writeInstructions(
    canvas: HTMLCanvasElement,
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'left',
    fontFamily: string = 'sans-serif',
    fontSize: number = 20,
    color: string = 'red',
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;

    // Split text into multiple lines
    const lines: string[] = text.split('\n');

    // Draw each line separately
    let offsetY: number = 0;
    const lineHeight: number = fontSize * 1.4; // adjust for spacing

    for (const line of lines) {
      ctx.fillText(line, xCoordinate, yCoordinate + offsetY);
      offsetY += lineHeight;
    }
  }

  /**
   * Draw a circle outline on the canvas
   *
   * @param canvas the canvas to draw to
   * @param centerX the x-coordinate of the center of the circle
   * @param centerY the y-coordinate of the center of the circle
   * @param radius the radius of the circle
   * @param color the color of the circle outline
   */
  public static drawCircle(
    canvas: HTMLCanvasElement,
    centerX: number,
    centerY: number,
    radius: number,
    color: string = 'red',
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

    /**
   * Draw a circle outline on the canvas REVERSED
   *
   * @param canvas the canvas to draw to
   * @param centerX the x-coordinate of the center of the circle
   * @param centerY the y-coordinate of the center of the circle
   * @param radius the radius of the circle
   * @param color the color of the circle outline
   */

    public static drawReverseCircle(
      canvas: HTMLCanvasElement,
      centerX: number,
      centerY: number,
      radius: number,
      color: string = 'red',
    ): void {
      const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fill('evenodd');
      ctx.restore();
    }

  /**
   * Draw a rectangle outline to the canvas
   *
   * @param canvas the canvas to draw to
   * @param dx the x-coordinate of the rectangle's left left corner
   * @param dy the y-coordinate of the rectangle's left left corner
   * @param width the width of the rectangle from x to the right
   * @param height the height of the rectrangle from y downwards
   * @param color the color of the rectangle outline
   */
  public static drawRectangle(
    canvas: HTMLCanvasElement,
    dx: number,
    dy: number,
    width: number,
    height: number,
    color: string = 'red',
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(dx, dy, width, height);
    ctx.stroke();
  }

  /**
   * Draw a filled circle on the canvas
   *
   * @param canvas the canvas to draw to
   * @param centerX the x-coordinate of the center of the circle
   * @param centerY the y-coordinate of the center of the circle
   * @param radius the radius of the circle
   * @param color the color of the circle
   */
  public static fillCircle(
    canvas: HTMLCanvasElement,
    centerX: number,
    centerY: number,
    radius: number,
    color: string = 'red',
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * Draw a filled rectangle to the canvas
   *
   * @param canvas the canvas to draw to
   * @param dx the x-coordinate of the rectangle's left left corner
   * @param dy the y-coordinate of the rectangle's left left corner
   * @param width the width of the rectangle from x to the right
   * @param height the height of the rectrangle from y downwards
   * @param color the color of the rectangle
   */
  public static fillRectangle(
    canvas: HTMLCanvasElement,
    dx: number,
    dy: number,
    width: number,
    height: number,
    color: string = 'red',
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(dx, dy, width, height);
    ctx.fill();
  }

  /**
   * Draw a message box in the center of the canvas
   *
   * @param canvas the canvas to draw to
   * @param text the text to display in the message box
   * @param color the color of the message box
   * @param boxWidth width of the box
   * */
  public static drawMessage(
    canvas: HTMLCanvasElement,
    text: string,
    color: string,
    boxWidth: number = 600
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);

    // const boxWidth: number = 600;
    const boxHeight: number = 200;
    const x: number = canvas.width / 2 - boxWidth / 2;
    const y: number = canvas.height / 2 - boxHeight / 2;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, boxWidth, boxHeight);

    ctx.fillStyle = '#ffffff';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    ctx.restore();
  }

  /**
   * Draw a button on the canvas
   *
   * @param canvas the canvas to draw to
   * @param x the x-coordinate of the button
   * @param y the y-coordinate of the button
   * @param width the width of the button
   * @param height the height of the button
   * @param text the text to display on the button
   * @param backgroundColor the background color of the button
   * @param textColor the text color of the button
   * */
  public static drawButton(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    backgroundColor: string = '#ffffffff',
    textColor: string = '#000000ff'
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = textColor;
    ctx.font = '25px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + width / 2, y + height / 2);
  }

  /**
   * Draw a rounded rectangle with shadow
   *
   * @param canvas the canvas to draw to
   * @param x the x-coordinate
   * @param y the y-coordinate
   * @param width the width
   * @param height the height
   * @param radius the border radius
   * @param fillColor the fill color
   * @param shadowColor the shadow color
   */
  public static drawRoundedRect(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor: string,
    shadowColor?: string,
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);

    ctx.save();

    if (shadowColor) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
    }

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw text with shadow for better readability
   *
   * @param canvas the canvas to draw to
   * @param text the text to display
   * @param x the x-coordinate
   * @param y the y-coordinate
   * @param fontSize the font size
   * @param color the text color
   * @param fontFamily the font family
   * @param alignment the text alignment
   * @param shadowColor the shadow color (optional)
   */
  public static drawTextWithShadow(
    canvas: HTMLCanvasElement,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    color: string,
    fontFamily: string = 'Arial',
    alignment: CanvasTextAlign = 'center',
    shadowColor?: string,
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);

    ctx.save();
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = alignment;
    ctx.textBaseline = 'middle';

    if (shadowColor) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }

    ctx.fillStyle = color;
    ctx.fillText(text, x, y);

    ctx.restore();
  }

  /**
   * Draw a speech bubble (for alien dialogue)
   *
   * @param canvas the canvas to draw to
   * @param x the x-coordinate
   * @param y the y-coordinate
   * @param width the width
   * @param height the height
   * @param fillColor the fill color
   * @param text the text to display
   */
  public static drawSpeechBubble(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    text: string,
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    const radius: number = 20;

    ctx.save();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 40, y + height);
    ctx.lineTo(x + 20, y + height + 20);
    ctx.lineTo(x + 60, y + height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = '#333333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + width / 2, y + height / 2);
  }

  /**
   * Draw an interactive answer button
   *
   * @param canvas the canvas to draw to
   * @param x the x-coordinate
   * @param y the y-coordinate
   * @param width the width
   * @param height the height
   * @param letter the answer letter (A, B, C)
   * @param text the answer text
   * @param color the button color
   * @param isHovered whether the button is being hovered
   */
  public static drawAnswerButton(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    letter: string,
    text: string,
    color: string,
    isHovered: boolean,
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    const radius: number = 15;
    const scale: number = isHovered ? 1.05 : 1;
    const adjustedWidth: number = width * scale;
    const adjustedHeight: number = height * scale;
    const adjustedX: number = x - (adjustedWidth - width) / 2;
    const adjustedY: number = y - (adjustedHeight - height) / 2;

    ctx.save();

    ctx.shadowColor = isHovered ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = isHovered ? 15 : 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.moveTo(adjustedX + radius, adjustedY);
    ctx.lineTo(adjustedX + adjustedWidth - radius, adjustedY);
    ctx.quadraticCurveTo(adjustedX + adjustedWidth, adjustedY, adjustedX + adjustedWidth, adjustedY + radius);
    ctx.lineTo(adjustedX + adjustedWidth, adjustedY + adjustedHeight - radius);
    ctx.quadraticCurveTo(
      adjustedX + adjustedWidth,
      adjustedY + adjustedHeight,
      adjustedX + adjustedWidth - radius,
      adjustedY + adjustedHeight,
    );
    ctx.lineTo(adjustedX + radius, adjustedY + adjustedHeight);
    ctx.quadraticCurveTo(adjustedX, adjustedY + adjustedHeight, adjustedX, adjustedY + adjustedHeight - radius);
    ctx.lineTo(adjustedX, adjustedY + radius);
    ctx.quadraticCurveTo(adjustedX, adjustedY, adjustedX + radius, adjustedY);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();

    const circleX: number = adjustedX + 30;
    const circleY: number = adjustedY + adjustedHeight / 2;
    const circleRadius: number = 20;

    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, circleX, circleY);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(text, adjustedX + 65, adjustedY + adjustedHeight / 2);
  }

  /**
   * Draw a decorative star
   *
   * @param canvas the canvas to draw to
   * @param cx the center x-coordinate
   * @param cy the center y-coordinate
   * @param spikes the number of spikes
   * @param outerRadius the outer radius
   * @param innerRadius the inner radius
   * @param color the star color
   */
  public static drawStar(
    canvas: HTMLCanvasElement,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    color: string,
  ): void {
    const ctx: CanvasRenderingContext2D = CanvasRenderer.getCanvasContext(canvas);
    let rot: number = (Math.PI / 2) * 3;
    let x: number = cx;
    let y: number = cy;
    const step: number = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i: number = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}
