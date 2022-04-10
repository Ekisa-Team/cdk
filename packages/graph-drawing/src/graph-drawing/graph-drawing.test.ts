import { describe, expect, it } from 'vitest';
import { GraphDrawing } from './graph-drawing';
import { DEFAULT_GRAPH_DRAWING_CONFIG, GraphDrawingConfig } from './graph-drawing.config';

class MockGraphDrawing extends GraphDrawing {
  mountScopedFrame(): GraphDrawing {
    const frame = `<div><svg></svg></div>`;
    const parser = new DOMParser();
    this.wrapperElement = parser.parseFromString(frame, 'text/html').body as HTMLDivElement;
    return this;
  }

  startProcess(): GraphDrawing {
    throw new Error('Method not implemented.');
  }

  redraw(): void {
    console.log('redraw');
  }
}

describe('GraphDrawing', () => {
  describe('loadCoordinates', () => {
    it('should load coordinates ordered by "order" field', () => {
      const graph = new MockGraphDrawing().mountScopedFrame();

      const coordinates = [
        { x: 172, y: 366, order: 1 },
        { x: 99, y: 156, order: 2 },
        { x: 94, y: 165, order: 0 },
      ];

      graph.loadCoordinates(coordinates);

      const expectedCoordinates = [
        { x: 94, y: 165, order: 0 },
        { x: 172, y: 366, order: 1 },
        { x: 99, y: 156, order: 2 },
      ];

      expect(graph.getCoordinates()).toEqual(expectedCoordinates);
    });
  });

  describe('getCoordinates', () => {
    it(`should return empty array if there aren't any coordinates configured`, () => {
      const graph = new MockGraphDrawing().mountScopedFrame();
      expect(graph.getCoordinates()).toEqual([]);
    });

    it(`should return loaded coordinates`, () => {
      const graph = new MockGraphDrawing().mountScopedFrame();

      const coordinates = [
        { x: 94, y: 165, order: 0 },
        { x: 99, y: 156, order: 1 },
      ];

      graph.loadCoordinates(coordinates);

      expect(graph.getCoordinates()).toEqual(coordinates);
    });
  });

  it('should enable lines drawing capability', () => {
    const graph = new MockGraphDrawing().mountScopedFrame();
    graph.enableDrawingLines();
    expect(graph.getCurrentConfig().canDrawLines).toBeTruthy();
  });

  it('should disable lines drawing capability', () => {
    const graph = new MockGraphDrawing().mountScopedFrame();
    graph.disableDrawingLines();
    expect(graph.getCurrentConfig().canDrawLines).toBeFalsy();
  });

  it('should enable nodes removal capability', () => {
    const graph = new MockGraphDrawing().mountScopedFrame();
    graph.enableNodesRemoval();
    expect(graph.getCurrentConfig().canRemoveNodes).toBeTruthy();
  });

  it('should disable nodes removal capability', () => {
    const graph = new MockGraphDrawing().mountScopedFrame();
    graph.disableNodesRemoval();
    expect(graph.getCurrentConfig().canRemoveNodes).toBeFalsy();
  });

  describe('compile', () => {
    it('should compile config without losing any data', () => {
      const expectedConfig: GraphDrawingConfig = DEFAULT_GRAPH_DRAWING_CONFIG;
      expectedConfig.canDrawLines = true;
      expectedConfig.styles!.node!.color = 'red';
      expectedConfig.styles!.line!.color = 'blue';

      const graph = new MockGraphDrawing({
        canDrawLines: true,
        styles: {
          node: { color: 'red' },
          line: { color: 'blue' },
        },
      });

      expect(graph.getCurrentConfig()).toBe(expectedConfig);
    });
  });
});
