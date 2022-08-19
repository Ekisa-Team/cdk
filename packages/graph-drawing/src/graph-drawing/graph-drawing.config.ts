import { Cursor } from '../types/cursor.type';

export type GraphDrawingStyles = {
  node: Partial<{
    shape: 'circle' | 'pathX';
    color: string;
    hoverColor: string;
    hoverSizeMultiplier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    width: number;
    transition: string;
    cursor: Cursor;
  }>;
  line: Partial<{
    color: string;
    width: number;
  }>;
};

export type GraphDrawingConfig = {
  // Behavior config
  canDrawLines?: boolean;
  canRemoveNodes?: boolean;

  // Styles config
  styles?: Partial<GraphDrawingStyles>;
};

export const DEFAULT_GRAPH_DRAWING_CONFIG: GraphDrawingConfig = {
  canDrawLines: false,
  canRemoveNodes: false,
  styles: {
    node: {
      shape: 'circle',
      color: '#1d4ed8',
      hoverColor: '#e11d48',
      hoverSizeMultiplier: 2,
      width: 6,
      transition: 'all ease-out 200ms',
      cursor: 'pointer',
    },
    line: {
      color: '#fde047',
      width: 3,
    },
  },
};
