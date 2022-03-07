import { CircleCoordinate } from './types/circle-coordinate.type';
import { Cursor } from './types/cursor.type';
import { DrawingConfig } from './types/draw-config.type';

/**
 * Add dynamic capabilities to SVG elements to draw on images
 */
export class SvgDraw {
  //#region Attributes
  private drawingElement: HTMLDivElement | null = null;

  private readonly defaultConfig: DrawingConfig = {
    circle: {
      color: '#1d4ed8',
      hoverColor: '#e11d48',
      hoverSizeMultiplier: 2,
      width: 6,
      transition: 'all ease-out 200ms',
      cursor: 'pointer',
    },
    line: {
      color: '#fde047',
      width: 3,
    },
  };

  private config = JSON.parse(JSON.stringify(this.defaultConfig)) as DrawingConfig;
  //#endregion

  //#region Constructor
  constructor() {}
  //#endregion

  //#region Getters && Setters
  get circles(): NodeListOf<SVGCircleElement> | undefined {
    return this.drawingElement?.querySelectorAll('svg circle');
  }

  private set circle(args: {
    cx: string;
    cy: string;
    width: number;
    color: string;
    hoverColor: string;
    hoverSizeMultiplier: number;
    transition: string;
    cursor: Cursor;
  }) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', args.cx);
    circle.setAttribute('cy', args.cy);
    circle.setAttribute('r', args.width.toString());
    circle.setAttribute('fill', args.color);
    circle.style.transition = args.transition;
    circle.style.cursor = args.cursor;

    // Add circle events
    circle.addEventListener('mouseenter', () => {
      circle.setAttribute('fill', args.hoverColor);
      circle.setAttribute('r', (args.width * args.hoverSizeMultiplier).toString());
    });

    circle.addEventListener('mouseleave', () => {
      circle.setAttribute('fill', args.color);
      circle.setAttribute('r', args.width.toString());
    });

    circle.addEventListener('click', (event) => {
      event.stopPropagation();
      circle.remove();
      this.redraw();
    });

    this.drawingElement!.querySelector('svg')!.append(circle);
  }

  get lines(): NodeListOf<SVGLineElement> | undefined {
    return this.drawingElement?.querySelectorAll('svg line');
  }

  private set line(args: {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    color: string;
    width: number;
  }) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', args.x1);
    line.setAttribute('y1', args.y1);
    line.setAttribute('x2', args.x2);
    line.setAttribute('y2', args.y2);
    line.style.stroke = args.color;
    line.style.strokeWidth = args.width.toString();
    this.drawingElement!.querySelector('svg')!.prepend(line);
  }

  //#endregion

  //#region Public methods
  /**
   * Create frame for specified image source
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
   * Draw lines on the SVG whenever the user clicks on it
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
      this.circle = {
        cx: x.toString(),
        cy: y.toString(),
        width: this.config.circle!.width!,
        color: this.config.circle!.color!.toString(),
        hoverColor: this.config.circle!.hoverColor!.toString(),
        hoverSizeMultiplier: this.config.circle!.hoverSizeMultiplier!,
        transition: this.config.circle!.transition!,
        cursor: this.config.circle!.cursor!,
      };

      // Connect circles with lines
      this.redraw();
    });

    return this;
  }

  redraw(): void {
    const circles = this.circles;
    const lines = this.lines;

    lines && lines.forEach((line) => line.remove());

    if (!circles || circles.length < 2) return;

    for (let i = 0; i < circles.length; i++) {
      const current = circles[i];
      const next = circles[i + 1];

      if (!next) return;

      // Get coordinates for two subsequent dots
      const currentCx = current.attributes.getNamedItem('cx')!;
      const currentCy = current.attributes.getNamedItem('cy')!;
      const nextCx = next.attributes.getNamedItem('cx')!;
      const nextCy = next.attributes.getNamedItem('cy')!;

      // Draw line between two subsequent dots
      this.line = {
        x1: currentCx.value,
        y1: currentCy.value,
        x2: nextCx.value,
        y2: nextCy.value,
        color: this.config.line!.color!,
        width: this.config.line!.width!,
      };
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
   * Returns circle coordinates
   * @returns HTMLElement
   */
  getCoordinates(): CircleCoordinate[] {
    const circles = this.circles;

    if (!circles) return [];

    return [...Array.from(circles)].map((c, i) => ({
      x: c.cx.baseVal.value,
      y: c.cy.baseVal.value,
      order: i,
    }));
  }

  /**
   * Load circle coordinates en redraw lines
   * @param coordinates circle coordinates
   */
  loadCoordinates(coordinates: CircleCoordinate[]): void {
    coordinates
      .sort((a, b) => a.order - b.order)
      .forEach((c) => {
        this.circle = {
          cx: c.x.toString(),
          cy: c.y.toString(),
          width: this.config.circle!.width!,
          color: this.config.circle!.color!.toString(),
          hoverColor: this.config.circle!.hoverColor!.toString(),
          hoverSizeMultiplier: this.config.circle!.hoverSizeMultiplier!,
          transition: this.config.circle!.transition!,
          cursor: this.config.circle!.cursor!,
        };
      });
  }

  /**
   * Compile drawing configuration on demand
   * @param config config schema for drawing elements
   * @returns SvgDraw
   */
  compile(config?: DrawingConfig): SvgDraw {
    if (!config) return this;
    this.processConfiguration(config);
    return this;
  }

  //#endregion

  //#region Private methods
  /**
   * Recursively populate global configuration object
   * @param config parent or child config object
   * @param path parent object key
   */
  private processConfiguration(config?: any, path = '') {
    for (let k in config) {
      const val = config[k];

      if (val && typeof val === 'object' && !Array.isArray(val)) {
        this.processConfiguration(val, k);
      } else {
        (this.config as any)[path][k] = val;
      }
    }
  }
  //#endregion
}
