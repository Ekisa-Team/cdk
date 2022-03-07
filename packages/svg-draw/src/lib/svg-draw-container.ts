import { CircleCoordinate } from './types/circle-coordinate.type';
import { Cursor } from './types/cursor.type';
import { DrawingConfig } from './types/draw-config.type';

/**
 * Add dynamic capabilities to SVG elements to draw on images
 */
export class SvgDrawContainer {
  //#region Attributes
  private drawingElement: HTMLDivElement | null = null;

  private readonly defaultConfig: DrawingConfig = {
    circle: {
      color: '#1d4ed8',
      hoverColor: '#e11d48',
      hoverSizeMultiplier: 2,
      width: 6,
      transition: 'all ease-out 200ms',
      cursor: 'default',
      hoverCursor: 'pointer',
    },
    line: {
      color: '#fde047',
      width: 3,
    },
  };

  private config = JSON.parse(JSON.stringify(this.defaultConfig)) as DrawingConfig;

  private canDrawLines = false;
  private canRemoveNodes = false;
  //#endregion

  //#region Getters && Setters
  private get nodes(): NodeListOf<SVGCircleElement> | undefined {
    return this.drawingElement?.querySelectorAll('svg circle');
  }

  private set node(args: {
    cx: string;
    cy: string;
    width: number;
    color: string;
    hoverColor: string;
    hoverSizeMultiplier: number;
    transition: string;
    cursor: Cursor;
    hoverCursor: Cursor;
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
      if (this.canRemoveNodes) {
        circle.setAttribute('fill', args.hoverColor);
        circle.setAttribute('r', (args.width * args.hoverSizeMultiplier).toString());
        circle.style.cursor = args.hoverCursor;
      }
    });

    circle.addEventListener('mouseleave', () => {
      if (this.canRemoveNodes) {
        circle.setAttribute('fill', args.color);
        circle.setAttribute('r', args.width.toString());
        circle.style.cursor = args.cursor;
      }
    });

    circle.addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.canRemoveNodes) {
        circle.remove();
        this.redraw();
      }
    });

    this.drawingElement!.querySelector('svg')!.append(circle);
  }

  private get lines(): NodeListOf<SVGLineElement> | undefined {
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
  }): SvgDrawContainer {
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
   * Allow users to draw lines on the SVG
   * @returns SvgDraw
   */
  enableDrawingLines(): SvgDrawContainer {
    this.canDrawLines = true;
    return this;
  }

  /**
   * Prevent users from drawing lines on the SVG
   * @returns SvgDraw
   */
  disableDrawingLines(): SvgDrawContainer {
    this.canDrawLines = false;
    return this;
  }

  /**
   * Allow users to delete nodes
   * @returns SvgDraw
   */
  enableNodesRemoving(): SvgDrawContainer {
    this.canRemoveNodes = true;
    return this;
  }

  /**
   * Prevent users from removing nodes
   * @returns SvgDraw
   */
  disableNodesRemoving(): SvgDrawContainer {
    this.canRemoveNodes = false;
    return this;
  }

  /**
   * Connect nodes with SVG lines
   *
   */
  redraw(): void {
    const nodes = this.nodes;
    const lines = this.lines;

    lines && lines.forEach((line) => line.remove());

    if (!nodes || nodes.length < 2) return;

    for (let i = 0; i < nodes.length; i++) {
      const current = nodes[i];
      const next = nodes[i + 1];

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
   * Returns drawing HTML element
   * @returns HTMLElement
   */
  getElement(): HTMLDivElement | null {
    return this.drawingElement;
  }

  /**
   * Returns nodes
   * @returns HTMLElement
   */
  getNodes(): NodeListOf<SVGCircleElement> | undefined {
    return this.nodes;
  }

  /**
   * Returns nodes coordinates
   * @returns HTMLElement
   */
  getCoordinates(): CircleCoordinate[] {
    const nodes = this.nodes;

    if (!nodes) return [];

    return Array.from(nodes).map((c, i) => ({
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
        this.node = {
          cx: c.x.toString(),
          cy: c.y.toString(),
          width: this.config.circle!.width!,
          color: this.config.circle!.color!.toString(),
          hoverColor: this.config.circle!.hoverColor!.toString(),
          hoverSizeMultiplier: this.config.circle!.hoverSizeMultiplier!,
          transition: this.config.circle!.transition!,
          cursor: this.config.circle!.cursor!,
          hoverCursor: this.config.circle!.hoverCursor!,
        };
      });

    this.redraw();
  }

  /**
   * Start drawing process
   */
  start(): SvgDrawContainer {
    if (!this.drawingElement) throw new Error('The source frame is not configured');

    this.drawingElement.addEventListener('click', ({ clientX, clientY }) => {
      if (!this.canDrawLines) return;

      // Get coordinates
      const dim = this.drawingElement?.getBoundingClientRect()!;
      const x = clientX - dim.left;
      const y = clientY - dim.top;

      // Draw circles on SVG
      this.node = {
        cx: x.toString(),
        cy: y.toString(),
        width: this.config.circle!.width!,
        color: this.config.circle!.color!.toString(),
        hoverColor: this.config.circle!.hoverColor!.toString(),
        hoverSizeMultiplier: this.config.circle!.hoverSizeMultiplier!,
        transition: this.config.circle!.transition!,
        cursor: this.config.circle!.cursor!,
        hoverCursor: this.config.circle!.hoverCursor!,
      };

      // Connect circles with lines
      this.redraw();
    });

    return this;
  }

  /**
   * Compile drawing configuration on demand
   * @param config config schema for drawing elements
   * @returns SvgDraw
   */
  compile(config?: DrawingConfig): SvgDrawContainer {
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
