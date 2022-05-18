# @ekisa-cdk/graph-drawing

[![NPM version](https://img.shields.io/npm/v/@ekisa-cdk/graph-drawing?color=a1b858&label=)](https://www.npmjs.com/package/@ekisa-cdk/graph-drawing)

## Table of contents

- [Getting started](#getting-started)
- [Basic usage](#basic-usage)
- [Scoped frame options](#scoped-frame-options)
- [API usage](#api-usage)

## **Getting started**

**1. Install package**:

```
npm i @ekisa-cdk/graph-drawing
```

## **Basic usage**

**1. Import LineGraphDrawing class**:

```ts
import { LineGraphDrawing } from '@ekisa-cdk/graph-drawing';
```

**2. Create instance, mount scoped frame & run process**:

```ts
const graph = new LineGraphDrawing({
  canDrawLines: true,
  canRemoveNodes: true,
})
  .mountScopedFrame({
    image: {
      src: 'some-image.png',
      alt: 'Some description',
      objectFit: 'fill',
    },
    container: {
      boundaries: [
        // top
        {
          width: '100%',
          height: '116px',
          inset: '0',
          cursor: 'url("https://i.stack.imgur.com/bUGV0.png"), auto',
        },
        // right
        {
          width: '114px',
          height: '100%',
          inset: '0 0 0 auto',
          cursor: 'url("https://i.stack.imgur.com/bUGV0.png"), auto',
        },
        // bottom
        {
          width: '100%',
          height: '98px',
          inset: 'auto auto 0 auto',
          cursor: 'url("https://i.stack.imgur.com/bUGV0.png"), auto',
        },
        // left
        {
          width: '88px',
          height: '100%',
          inset: '0 auto 0 0',
          cursor: 'url("https://i.stack.imgur.com/bUGV0.png"), auto',
        },
      ],
      styles: {
        width: '1000px',
        heigth: '800px',
      },
    },
    frame: {
      styles: {
        cursor: 'crosshair',
      },
    },
  })
  .startProcess();
```

## **Scoped frame options**

```ts
{
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
}
```

## **API usage**

### **Get nodes**

```ts
graph.getNodes();
```

### **Get frame coordinate**

```ts
graph.getContainerElement();
```

### **Load coordinates on the frame**

```ts
graph.loadCoordinates([
  { x: 94, y: 165, order: 0 },
  { x: 507, y: 166, order: 1 },
  { x: 172, y: 366, order: 2 },
]);
```

### **Redraw nodes**

```ts
graph.redraw();
```

### **Export graph**

```ts
graph.exportAs('image/jpeg');
graph.exportAs('image/png');
```

### **Enable lines drawing**

```ts
graph.enableDrawingLines();
```

### **Disable lines drawing**

```ts
graph.disableDrawingLines();
```

### **Enable nodes removal**

```ts
graph.enableNodesRemoval();
```

### **Disable nodes removal**

```ts
graph.disableNodesRemoval();
```

## License

[MIT](./LICENSE) License © 2021 [Ekisa Team](https://github.com/Ekisa-Team/cdk)
