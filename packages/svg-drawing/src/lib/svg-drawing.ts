type HTMLSvg = HTMLElement & SVGElement;

export type SvgDrawingArgs = {
  imageSource: string;
  style: {
    strokeColor: string;
    strokeWidth: number;
  };
};

export class SvgDrawing {
  constructor() {}

  addLineDrawingEvent(): void {}

  /**
   * Creates canvas frame for specified image source
   * @param src image url
   * @returns SVG element
   */
  createSourceFrame(src: string): HTMLSvg {
    const svgString = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <image href="${src}" style="width: 100%; height: 100%" />
        </svg>
      `;

    const parser = new DOMParser();
    const svg = parser.parseFromString(svgString, "text/html");
    return svg.body as unknown as HTMLSvg;
  }
}
