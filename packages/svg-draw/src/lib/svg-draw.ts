import { DrawingStyles } from './types/draw-styles.type';

/**
 * Add dynamic capabilities to SVG elements to draw on images
 */
export class SvgDraw {
  //#region Attributes
  private drawingElement: HTMLDivElement | null = null;

  private readonly defaultDrawingStyles: DrawingStyles = {
    circleColor: 'blue',
    circleWidth: 6,
    lineColor: 'blue',
    lineWidth: 2,
  };

  private drawingStyles = JSON.parse(JSON.stringify(this.defaultDrawingStyles)) as DrawingStyles;
  //#endregion

  //#region Constructor
  constructor() {}
  //#endregion

  //#region Getters && Setters
  getCircles(): NodeListOf<SVGCircleElement> | undefined {
    return this.drawingElement?.querySelectorAll('svg circle');
  }

  setCircle(circle: SVGCircleElement) {
    this.drawingElement?.querySelector('svg')?.appendChild(circle);
  }

  getLines(): NodeListOf<SVGLineElement> | undefined {
    return this.drawingElement?.querySelectorAll('svg line');
  }

  setLine(line: SVGLineElement) {
    this.drawingElement?.querySelector('svg')?.appendChild(line);
  }
  //#endregion

  //#region Public methods
  /**
   * Creates canvas frame for specified image source
   * @param src image url
   * @returns SvgDrawing
   */
  createSourceFrame({
    image,
    style,
  }: {
    image: {
      src: string;
      alt?: string;
      objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    };
    style?: { width?: string; heigth?: string };
  }): SvgDraw {
    // Create image wrapper
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = style?.width ?? '100%';
    wrapper.style.height = style?.heigth ?? '100%';

    // Modify passed image attributes
    const imgClone = document.createElement('img');
    imgClone.src = image.src;
    imgClone.alt = image.alt ?? '';
    imgClone.style.display = 'block';
    imgClone.style.width = '100%';
    imgClone.style.height = '100%';
    imgClone.style.objectFit = image.objectFit ?? 'fill';

    wrapper.appendChild(imgClone);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.innerHTML = 'Sorry, your browser does not support inline SVG.';

    wrapper.appendChild(svg);

    this.drawingElement = wrapper;
    return this;
  }

  /**
   * Draws lines on the SVG whenever the user clicks on it
   * @returns SvgDrawing
   */
  addDrawingEvents(): SvgDraw {
    if (!this.drawingElement) throw new Error('The source frame is incorrect');

    this.drawingElement.addEventListener('click', ({ clientX, clientY }) => {
      // Get coordinates
      const dim = this.drawingElement?.getBoundingClientRect()!;
      const x = clientX - dim.left;
      const y = clientY - dim.top;

      // Draw circles on SVG
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const { circleWidth, circleColor } = this.drawingStyles;

      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', circleWidth!.toString());
      circle.setAttribute('fill', circleColor!.toString());
      circle.style.transition = 'all ease-in-out 200ms';
      circle.style.cursor = 'pointer';
      this.setCircle(circle);

      // Add circle events
      circle.addEventListener('mouseenter', () =>
        circle.setAttribute('r', (circleWidth! * 3).toString()),
      );
      circle.addEventListener('mouseleave', () =>
        circle.setAttribute('r', circleWidth!.toString()),
      );
      circle.addEventListener('click', (event) => {
        event.stopPropagation();
        circle.remove();
        this.redraw();
      });

      // Connect circles with lines
      this.redraw();
    });

    return this;
  }

  redraw(): void {
    const circles = this.getCircles();
    const lines = this.getLines();

    lines && lines.forEach((line) => line.remove());

    if (!circles || circles.length < 2) return;

    for (let i = 0; i < circles.length; i++) {
      const current = circles[i];
      const next = circles[i + 1];

      if (!next) return;

      const currentCx = current.attributes.getNamedItem('cx')!;
      const currentCy = current.attributes.getNamedItem('cy')!;
      const nextCx = next.attributes.getNamedItem('cx')!;
      const nextCy = next.attributes.getNamedItem('cy')!;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', currentCx.value);
      line.setAttribute('y1', currentCy.value);
      line.setAttribute('x2', nextCx.value);
      line.setAttribute('y2', nextCy.value);
      line.style.stroke = 'red';
      line.style.strokeWidth = '2';
      this.setLine(line);
    }
  }

  /**
   * Returns SVG node
   * @returns HTMLElement
   */
  getNode(): HTMLDivElement | null {
    return this.drawingElement;
  }

  /**
   *
   */
  compile(drawingStyles?: DrawingStyles): SvgDraw {
    if (!drawingStyles) return this;

    for (const key in drawingStyles) {
      const prop: keyof DrawingStyles = key as keyof DrawingStyles;
      (this.drawingStyles[prop] as any) = drawingStyles[prop] ?? this.defaultDrawingStyles[prop];
    }

    return this;
  }
  //#endregion
}
