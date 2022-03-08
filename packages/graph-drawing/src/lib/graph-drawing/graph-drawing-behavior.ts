import { NodeCoordinate } from '../shared/node-coordinate.type';
import { GraphDrawingConfig } from './graph-drawing.config';

export abstract class GraphDrawingBehavior {
  /**
   * Return current graph config
   */
  abstract getCurrentConfig(): GraphDrawingConfig | null;

  /**
   * Return parent HTML element
   */
  abstract getContainerElement(): HTMLDivElement | null;

  /**
   * Returns list of nodes
   */
  abstract getNodes(): NodeListOf<SVGCircleElement> | undefined;

  /**
   * Returns list of nodes coordinates
   */
  abstract getCoordinates(): NodeCoordinate[];

  /**
   * Load node coordinates and redraw lines
   */
  abstract loadCoordinates(coordinates: NodeCoordinate[]): void;

  /**
   * Allow users to draw lines and connect nodes
   */
  abstract enableLinesDrawing(): void;

  /**
   * Prevent users from drawing lines and connecting nodes
   */
  abstract disableLinesDrawing(): void;

  /**
   * Allow users to remove nodes
   */
  abstract enableNodesRemoval(): void;

  /**
   * Prevent users from removing nodes
   */
  abstract disableNodesRemoval(): void;

  /**
   * Compile drawing configuration on demand and set up events
   * @param config config schema
   */
  abstract compile(config?: GraphDrawingConfig): void;
}
