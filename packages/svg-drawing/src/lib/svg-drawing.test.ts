import { describe, expect, it } from "vitest";
import { SvgDrawing } from "./svg-drawing";

describe("SvgDrawing", () => {
  describe("createSourceFrame", () => {
    /**
     * @vitest-environment happy-dom
     */
    it("should return svg element", () => {
      const svgDrawing = new SvgDrawing();
      const svgElement = svgDrawing.createSourceFrame("myimage.jpg");

      expect(svgElement.firstElementChild?.tagName).toBe("SVG");
    });
  });
});
