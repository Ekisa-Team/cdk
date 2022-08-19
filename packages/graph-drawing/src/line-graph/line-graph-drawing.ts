import { GraphDrawing } from '../graph-drawing/graph-drawing';
import { GraphDrawingConfig } from '../graph-drawing/graph-drawing.config';
import { Cursor } from '../types/cursor.type';

/**
 * Logic implementation for lines drawing on SVG frames
 */
export class LineGraphDrawing extends GraphDrawing {
  isHttpImageUrl!: boolean;

  constructor(config?: GraphDrawingConfig) {
    super(config);
  }

  mountScopedFrame(config: {
    image: {
      src: string;
      alt?: string;
      objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    };
    container?: {
      boundaries?: Array<
        Partial<{
          width: string;
          height: string;
          inset: string;
          backgroundColor?: string;
          opacity?: number;
          cursor?: Cursor;
        }>
      >;
      styles?: Partial<{
        width: string;
        heigth: string;
      }>;
    };
    frame?: {
      styles?: {
        backgroundColor?: string;
        opacity?: number;
        cursor?: Cursor;
      };
    };
  }): LineGraphDrawing {
    // Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = config?.container?.styles?.width ?? '100%';
    wrapper.style.height = config?.container?.styles?.heigth ?? '100%';
    wrapper.style.userSelect = 'none';

    // Create image element
    const imgClone = document.createElement('img');
    imgClone.src = config.image.src;
    imgClone.alt = config.image.alt ?? '';
    imgClone.style.display = 'block';
    imgClone.style.width = '100%';
    imgClone.style.height = '100%';
    imgClone.style.objectFit = config.image.objectFit ?? 'fill';
    wrapper.append(imgClone);

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.inset = '0';
    svg.innerHTML = 'Sorry, your browser does not support inline SVG.';
    if (config.frame?.styles?.cursor) {
      svg.style.cursor = config.frame.styles.cursor.toString();
    }
    if (config.frame?.styles?.backgroundColor) {
      svg.style.backgroundColor = config.frame.styles.backgroundColor;
    }
    if (config.frame?.styles?.opacity) {
      svg.style.opacity = config.frame.styles.opacity.toString();
    }

    wrapper.append(svg);

    // Setup boundaries
    if (config.container?.boundaries) {
      for (const boundarie of config.container.boundaries) {
        const bElement = document.createElement('div');
        bElement.style.position = 'absolute';
        bElement.style.width = boundarie.width || '';
        bElement.style.height = boundarie.height || '';
        bElement.style.inset = boundarie.inset || '';
        bElement.style.backgroundColor = boundarie.backgroundColor || 'transparent';
        bElement.style.opacity = boundarie.opacity?.toString() || '0';
        bElement.style.cursor = boundarie.cursor?.toString() || '';
        wrapper.append(bElement);
      }
    }

    this.wrapperElement = wrapper;
    return this;
  }

  startProcess(): LineGraphDrawing {
    const element = this.getContainerElement();

    if (!element) throw new Error('The scoped frame is not properly configured');

    const svgElement = element.querySelector('svg');

    svgElement?.addEventListener('click', (event) => {
      event.stopPropagation();
      const config = this.getCurrentConfig();

      // Get coordinates
      const dim = svgElement.getBoundingClientRect()!;

      // Draw node on SVG
      this.node = {
        x: event.clientX - dim.x,
        y: event.clientY - dim.y,
        shape: config.styles!.node!.shape!,
        width: config.styles!.node!.width!,
        color: config.styles!.node!.color!.toString(),
        hoverColor: config.styles!.node!.hoverColor!.toString(),
        hoverSizeMultiplier: config.styles!.node!.hoverSizeMultiplier!,
        transition: config.styles!.node!.transition!,
        cursor: config.styles!.node!.cursor!,
      };

      // Connect circles with lines
      this.redraw();
    });

    return this;
  }

  redraw(): void {
    const nodes = this.nodes;
    const lines = this.lines;

    // Clan up the lines already drawn
    lines && lines.forEach((line) => line.remove());

    if (!nodes || nodes.length < 2) return;

    // Traverse nodes & connect them with lines
    for (let i = 0; i < nodes.length; i++) {
      const current = nodes[i];
      const next = nodes[i + 1];

      if (next) {
        // Get coordinates for two subsequent nodes
        const currentCx = current.dataset.coordX!;
        const currentCy = current.dataset.coordY!;
        const nextCx = next.dataset.coordX!;
        const nextCy = next.dataset.coordY!;

        // Draw line between two subsequent nodes
        const config = this.getCurrentConfig();

        this.line = {
          x1: currentCx,
          y1: currentCy,
          x2: nextCx,
          y2: nextCy,
          color: config.styles!.line!.color!,
          width: config.styles!.line!.width!,
        };
      }
    }
  }
}
