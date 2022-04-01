import { GraphDrawing } from '../graph-drawing/graph-drawing';
import { GraphDrawingConfig } from '../graph-drawing/graph-drawing.config';

/**
 * Logic implementation for lines drawing on SVG frames
 */
export class LineGraphDrawing extends GraphDrawing {
  constructor(config?: GraphDrawingConfig) {
    super(config);
  }

  override mountScopedFrame({
    image,
    style,
  }: {
    image: {
      src: string;
      alt?: string;
      objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    };
    style?: { width?: string; heigth?: string };
  }): LineGraphDrawing {
    // Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = style?.width ?? '100%';
    wrapper.style.height = style?.heigth ?? '100%';

    // Create image element
    const imgClone = document.createElement('img');
    imgClone.src = image.src;
    imgClone.alt = image.alt ?? '';
    imgClone.style.display = 'block';
    imgClone.style.width = '100%';
    imgClone.style.height = '100%';
    imgClone.style.objectFit = image.objectFit ?? 'fill';
    wrapper.append(imgClone);

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.innerHTML = 'Sorry, your browser does not support inline SVG.';
    wrapper.append(svg);

    this.wrapperElement = wrapper;
    return this;
  }

  override startProcess(): LineGraphDrawing {
    const element = this.getContainerElement()!;

    if (!element) throw new Error('The scoped frame is not properly configured');

    element.addEventListener('click', ({ clientX, clientY }) => {
      const config = this.getCurrentConfig();

      if (!config.canDrawLines) return;

      // Get coordinates
      const dim = element.getBoundingClientRect()!;
      const x = clientX - dim.left;
      const y = clientY - dim.top;

      // Draw node on SVG
      this.node = {
        cx: x.toString(),
        cy: y.toString(),
        width: config.styles!.node!.width!,
        color: config.styles!.node!.color!.toString(),
        hoverColor: config.styles!.node!.hoverColor!.toString(),
        hoverSizeMultiplier: config.styles!.node!.hoverSizeMultiplier!,
        transition: config.styles!.node!.transition!,
        cursor: config.styles!.node!.cursor!,
        hoverCursor: config.styles!.node!.hoverCursor!,
      };

      // Connect circles with lines
      this.redraw();
    });

    return this;
  }

  override redraw(): void {
    const nodes = this.nodes;
    const lines = this.lines;

    // Clan up the lines already drawn
    lines && lines.forEach((line) => line.remove());

    if (!nodes || nodes.length < 2) return;

    // Traverse nodes & connect them with lines
    for (let i = 0; i < nodes.length; i++) {
      const current = nodes[i];
      const next = nodes[i + 1];

      if (!next) return;

      // Get coordinates for two subsequent nodes
      const currentCx = current.getAttribute('cx')!;
      const currentCy = current.getAttribute('cy')!;
      const nextCx = next.getAttribute('cx')!;
      const nextCy = next.getAttribute('cy')!;

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
