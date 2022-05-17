import { Cursor } from '../types/cursor.type';
import { NodeCoordinate } from '../types/node-coordinate.type';
import { DEFAULT_GRAPH_DRAWING_CONFIG, GraphDrawingConfig } from './graph-drawing.config';

/**
 * Define primitive behavior for SVG graph drawing
 */
export abstract class GraphDrawing {
  // References
  protected containerElement: HTMLDivElement | null = null;

  // Config attributes
  private config: GraphDrawingConfig;

  // Getters & Setters
  protected set wrapperElement(element: HTMLDivElement) {
    this.containerElement = element;
  }

  protected get nodes(): NodeListOf<SVGCircleElement> | undefined {
    return this.containerElement?.querySelectorAll('svg circle');
  }

  protected set node(args: {
    cx: string;
    cy: string;
    width: number;
    color: string;
    hoverColor: string;
    hoverSizeMultiplier: number;
    transition: string;
    cursor: Cursor;
  }) {
    if (!this.containerElement) throw new Error('The scoped frame is not properly configured');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', args.cx);
    circle.setAttribute('cy', args.cy);
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

    this.containerElement.querySelector('svg')?.append(circle);
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
  getNodes(): NodeListOf<SVGCircleElement> | undefined {
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
          cx: c.x.toString(),
          cy: c.y.toString(),
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
}
