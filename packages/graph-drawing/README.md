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
      src: 'https://d20khd7ddkh5ls.cloudfront.net/point_2.jpg',
      alt: 'lorem ipsum',
      objectFit: 'fill',
    },
    style: {
      width: '600px',
      heigth: '400px',
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
  },
  style?: {
    width?: string;
    heigth?: string
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

### **Enable lines drawing**

```ts
graph.enableLinesDrawing();
```

### **Disable lines drawing**

```ts
graph.disableLinesDrawing();
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
