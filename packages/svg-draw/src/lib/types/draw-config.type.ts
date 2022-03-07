import { Cursor } from './cursor.type';

export type DrawingConfig = {
  circle?: {
    color?: string;
    hoverColor?: string;
    hoverSizeMultiplier?: 2 | 3 | 4 | 5 | 6;
    width?: number;
    transition?: string;
    cursor?: Cursor;
    hoverCursor?: Cursor;
  };
  line?: {
    color?: string;
    width?: number;
  };
};
