import html2canvas, { Options as Html2CanvasOptions } from 'html2canvas';
import { NodeCoordinate } from '../types/node-coordinate.type';
import {
  DEFAULT_GRAPH_DRAWING_CONFIG,
  GraphDrawingConfig,
  GraphDrawingStyles,
} from './graph-drawing.config';

/**
 * Define primitive behavior for SVG graph drawing
 */
export abstract class GraphDrawing {
  // References
  protected containerElement: HTMLDivElement | null = null;

  // Config attributes
  private config: GraphDrawingConfig;

  // Accesors
  protected set wrapperElement(element: HTMLDivElement) {
    this.containerElement = element;
  }

  protected get nodes(): NodeListOf<SVGElement | SVGCircleElement> | undefined {
    return this.containerElement?.querySelectorAll('[data-type="node"]');
  }

  protected set node(args: { x: number; y: number } & Required<GraphDrawingStyles['node']>) {
    if (!this.containerElement) throw new Error('The scoped frame is not properly configured');

    switch (args.shape) {
      case 'circle':
        this.containerElement.querySelector('svg')?.append(this.getCircleContext(args));
        break;

      case 'pathX':
        this.containerElement.querySelector('svg')?.append(this.getPathXContext(args));
        break;
    }
  }

  protected get lines(): NodeListOf<SVGLineElement> | undefined {
    return this.containerElement?.querySelectorAll('svg line');
  }

  protected set line(args: {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    color: string;
    width: number;
  }) {
    if (!this.containerElement) throw new Error('The scoped frame is not properly configured');

    const config = this.getCurrentConfig();
    if (!config.canDrawLines) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', args.x1);
    line.setAttribute('y1', args.y1);
    line.setAttribute('x2', args.x2);
    line.setAttribute('y2', args.y2);
    line.style.stroke = args.color;
    line.style.strokeWidth = args.width.toString();
    this.containerElement.querySelector('svg')!.prepend(line);
  }

  // Constructor
  constructor(config?: GraphDrawingConfig | undefined) {
    // Initialize default config
    this.config = this.mergeConfig(DEFAULT_GRAPH_DRAWING_CONFIG, config ?? {});
  }

  /**
   * Return current graph config
   */
  getCurrentConfig(): GraphDrawingConfig {
    return this.config;
  }

  /**
   * Return parent HTML element
   */
  getContainerElement(): HTMLDivElement | null {
    return this.containerElement;
  }

  /**
   * Returns list of nodes
   */
  getNodes(): NodeListOf<SVGElement | SVGCircleElement> | undefined {
    return this.nodes;
  }

  /**
   * Returns list of nodes coordinates
   */
  getCoordinates(): NodeCoordinate[] {
    const nodes = this.nodes;

    if (!nodes) return [];

    return Array.from(nodes).map((node, i) => ({
      x: +node.getAttribute('cx')!,
      y: +node.getAttribute('cy')!,
      order: i,
    }));
  }

  /**
   * Load node coordinates and redraw lines
   */
  loadCoordinates(coordinates: NodeCoordinate[]): void {
    coordinates
      .sort((a, b) => a.order - b.order)
      .forEach((c) => {
        this.node = {
          x: c.x,
          y: c.y,
          shape: 'circle',
          width: this.config.styles!.node!.width!,
          color: this.config.styles!.node!.color!.toString(),
          hoverColor: this.config.styles!.node!.hoverColor!.toString(),
          hoverSizeMultiplier: this.config.styles!.node!.hoverSizeMultiplier!,
          transition: this.config.styles!.node!.transition!,
          cursor: this.config.styles!.node!.cursor!,
        };
      });

    this.redraw();
  }

  /**
   * Export frame as the specified mime type
   * @param mimeType file media identifier
   * @param options export options
   * @returns file encoded in base64
   */
  async exportAs(
    mimeType: 'image/jpeg' | 'image/png',
    options?: Partial<Html2CanvasOptions>,
  ): Promise<string> {
    // Validates container
    if (!this.containerElement) {
      throw new Error(
        `Error exporting frame as ${mimeType}: the container element couldn't be found.`,
      );
    }

    // Generates canvas
    const canvas = await html2canvas(this.containerElement, options);
    return canvas.toDataURL(mimeType, 1);
  }

  /**
   * Allow users to draw lines and connect nodes
   */
  enableDrawingLines(): void {
    this.config.canDrawLines = true;
  }

  /**
   * Prevent users from drawing lines and connecting nodes
   */
  disableDrawingLines(): void {
    this.config.canDrawLines = false;
  }

  /**
   * Allow users to remove nodes
   */
  enableNodesRemoval(): void {
    this.config.canRemoveNodes = true;
  }

  /**
   * Prevent users from removing nodes
   */
  disableNodesRemoval(): void {
    this.config.canRemoveNodes = false;
  }

  /**
   * Compile drawing configuration on demand and set up events
   * @param configUpdates config schema
   */
  compile(configUpdates?: GraphDrawingConfig): void {
    this.config = this.mergeConfig(this.config, configUpdates ?? {});
  }

  /**
   * Recursively merge configuration object with configuration updates
   * @param config initial configuration object
   * @param updates any config updates
   */
  mergeConfig(config: GraphDrawingConfig, updates: Partial<GraphDrawingConfig>) {
    for (const k of Object.keys(updates)) {
      const prop = k as keyof GraphDrawingConfig;

      if (!Object.prototype.hasOwnProperty.call(config, k) || typeof updates[prop] !== 'object') {
        (config[prop] as unknown) = updates[prop];
      } else {
        this.mergeConfig(config[prop] as never, updates[prop] as never);
      }
    }

    return config;
  }

  /**
   * Create frame for specified  source
   * @param config tree structure config
   */
  abstract mountScopedFrame(config: object): GraphDrawing;

  /**
   * Add implementation for drawing events
   */
  abstract startProcess(): GraphDrawing;

  /**
   * Traverse nodes and connect them
   */
  abstract redraw(): void;

  private getCircleContext(
    args: { x: number; y: number } & Required<GraphDrawingStyles['node']>,
  ): SVGCircleElement {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.dataset.type = 'node';
    circle.dataset.kind = 'circle';
    circle.dataset.coordX = args.x.toString();
    circle.dataset.coordY = args.y.toString();
    circle.setAttribute('cx', args.x.toString());
    circle.setAttribute('cy', args.y.toString());
    circle.setAttribute('r', args.width.toString());
    circle.setAttribute('fill', args.color);
    circle.style.transition = args.transition;
    circle.style.cursor = args.cursor.toString();

    // Add circle events
    circle.addEventListener('mouseenter', () => {
      if (this.config.canRemoveNodes) {
        circle.setAttribute('fill', args.hoverColor);
        circle.setAttribute('r', (args.width * args.hoverSizeMultiplier).toString());
      }
    });

    circle.addEventListener('mouseleave', () => {
      if (this.config.canRemoveNodes) {
        circle.setAttribute('fill', args.color);
        circle.setAttribute('r', args.width.toString());
      }
    });

    circle.addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.config.canRemoveNodes) {
        circle.remove();
        this.redraw();
      }
    });

    return circle;
  }

  private getPathXContext(
    args: { x: number; y: number } & Required<GraphDrawingStyles['node']>,
  ): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.dataset.type = 'node';
    svg.dataset.kind = 'path';
    svg.dataset.coordX = args.x.toString();
    svg.dataset.coordY = args.y.toString();
    svg.setAttribute('x', (args.x - 18).toString());
    svg.setAttribute('y', (args.y - 18).toString());
    svg.style.width = '32px';
    svg.style.height = '32px';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'm19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z',
    );
    path.setAttribute('fill', args.color);
    path.style.transition = args.transition;
    path.style.cursor = args.cursor.toString();

    // Add circle events
    svg.addEventListener('mouseenter', () => {
      if (this.config.canRemoveNodes) {
        path.setAttribute('fill', args.hoverColor);
      }
    });

    svg.addEventListener('mouseleave', () => {
      if (this.config.canRemoveNodes) {
        path.setAttribute('fill', args.color);
      }
    });

    svg.addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.config.canRemoveNodes) {
        svg.remove();
        this.redraw();
      }
    });

    svg.append(path);
    return svg;
  }
}
