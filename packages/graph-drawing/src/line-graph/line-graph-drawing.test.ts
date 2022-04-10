import { describe, expect, it } from 'vitest';
import { LineGraphDrawing } from './line-graph-drawing';

describe('LineGraphDrawing', () => {
  describe('mountScopedFrame', () => {
    it('should be a div element when frame is mounted', () => {
      const graph = new LineGraphDrawing().mountScopedFrame({ image: { src: '' } });
      expect(graph.getContainerElement()?.tagName).toBe('DIV');
    });

    it('should contain img element when frame is mounted', () => {
      const graph = new LineGraphDrawing().mountScopedFrame({ image: { src: '' } });
      expect(graph.getContainerElement()?.querySelector('img')).toBeTruthy();
    });

    it('should contain svg element when frame is mounted', () => {
      const graph = new LineGraphDrawing().mountScopedFrame({ image: { src: '' } });
      expect(graph.getContainerElement()?.querySelector('svg')).toBeTruthy();
    });
  });

  describe('startProcess', () => {
    it('should throw when frame is not mounted', () => {
      const graph = new LineGraphDrawing();
      expect(() => graph.startProcess()).toThrowError(
        'The scoped frame is not properly configured',
      );
    });
  });

  describe('redraw', () => {
    it('should connect two subsequent nodes with one line', () => {
      const graph = new LineGraphDrawing({ canDrawLines: true }).mountScopedFrame({
        image: { src: '' },
      });

      const coordinates = [
        { x: 94, y: 165, order: 0 },
        { x: 507, y: 166, order: 1 },
      ];

      graph.loadCoordinates(coordinates);
      graph.redraw();

      expect(graph.getContainerElement()?.querySelectorAll('svg line').length).toBe(1);
    });

    it('should connect three subsequent nodes with two lines', () => {
      const graph = new LineGraphDrawing({ canDrawLines: true }).mountScopedFrame({
        image: { src: '' },
      });

      const coordinates = [
        { x: 94, y: 165, order: 0 },
        { x: 507, y: 166, order: 1 },
        { x: 172, y: 366, order: 2 },
      ];

      graph.loadCoordinates(coordinates);
      graph.redraw();

      expect(graph.getContainerElement()?.querySelectorAll('svg line').length).toBe(2);
    });

    it('should connect six subsequent nodes with five lines', () => {
      const graph = new LineGraphDrawing({ canDrawLines: true }).mountScopedFrame({
        image: { src: '' },
      });

      const coordinates = [
        { x: 94, y: 165, order: 0 },
        { x: 507, y: 166, order: 1 },
        { x: 172, y: 366, order: 2 },
        { x: 291, y: 31, order: 3 },
        { x: 426, y: 364, order: 4 },
        { x: 99, y: 156, order: 5 },
      ];

      graph.loadCoordinates(coordinates);
      graph.redraw();

      expect(graph.getContainerElement()?.querySelectorAll('svg line').length).toBe(5);
    });
  });
});
