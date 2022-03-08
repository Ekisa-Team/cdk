/**
 * This file is just for testing purposes
 */

import { LineGraphDrawing } from './lib/line/line-graph-drawing';

const graph = new LineGraphDrawing({
  canDrawLines: true,
  canRemoveNodes: true,
})
  .mountScopedFrame({
    image: {
      src: 'https://d20khd7ddkh5ls.cloudfront.net/point_2.jpg',
      alt: 'Cartesian coordinate plane',
      objectFit: 'fill',
    },
    style: {
      width: '600px',
      heigth: '400px',
    },
  })
  .startProcess();

const container = graph.getContainerElement();

if (container) {
  const app = document.querySelector('#app')!;
  app.append(container);

  const clearNodes = () => {
    graph.getNodes().forEach((node) => {
      node.remove();
      graph.redraw();
    });
  };

  const getCoordinates = () => {
    const coordinates = graph.getCoordinates();
    console.log(coordinates);
    alert('Check the console');
  };

  const loadCoordinates = () => {
    const coordinates = [
      { x: 94, y: 165, order: 0 },
      { x: 507, y: 166, order: 1 },
      { x: 172, y: 366, order: 2 },
      { x: 291, y: 31, order: 3 },
      { x: 426, y: 364, order: 4 },
      { x: 99, y: 156, order: 5 },
    ];

    graph.loadCoordinates(coordinates);
  };

  const enableDrawingLines = () => graph.enableLinesDrawing();
  const disableDrawingLines = () => graph.disableLinesDrawing();
  const enableNodesRemoving = () => graph.enableNodesRemoval();
  const disableNodesRemoving = () => graph.disableNodesRemoval();

  const buttonsContainer = document.createElement('div');

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.onclick = clearNodes;

  const loadCoordsBtn = document.createElement('button');
  loadCoordsBtn.textContent = 'Load coordinates';
  loadCoordsBtn.onclick = loadCoordinates;

  const getCoordsBtn = document.createElement('button');
  getCoordsBtn.textContent = 'Get coordinates';
  getCoordsBtn.onclick = getCoordinates;

  const enableDrawBtn = document.createElement('button');
  enableDrawBtn.textContent = 'Enable drawing lines';
  enableDrawBtn.onclick = enableDrawingLines;

  const disableDrawBtn = document.createElement('button');
  disableDrawBtn.textContent = 'Disable drawing lines';
  disableDrawBtn.onclick = disableDrawingLines;

  const enableRmNodeBtn = document.createElement('button');
  enableRmNodeBtn.textContent = 'Enable removing nodes';
  enableRmNodeBtn.onclick = enableNodesRemoving;

  const disableRmNodeBtn = document.createElement('button');
  disableRmNodeBtn.textContent = 'Disable removing nodes';
  disableRmNodeBtn.onclick = disableNodesRemoving;

  buttonsContainer.append(clearBtn);
  buttonsContainer.append(loadCoordsBtn);
  buttonsContainer.append(getCoordsBtn);
  buttonsContainer.append(enableDrawBtn);
  buttonsContainer.append(disableDrawBtn);
  buttonsContainer.append(enableRmNodeBtn);
  buttonsContainer.append(disableRmNodeBtn);

  app.append(buttonsContainer);
}
