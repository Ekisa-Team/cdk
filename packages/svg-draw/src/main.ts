import { SvgDrawContainer } from './lib/svg-draw-container';

const drawContainer = new SvgDrawContainer()
  .createSourceFrame({
    image: {
      src: 'https://theanimaldentalclinic.com/wp-content/uploads/2019/01/shutterstock_1048325251.jpg',
      alt: 'Pacient teeth',
      objectFit: 'fill',
    },
    style: {
      width: '600px',
      heigth: '400px',
    },
  })
  .enableDrawingLines()
  .enableNodeRemoving()
  .compile({
    circle: {
      color: '#1d4ed8',
      hoverColor: '#e11d48',
      hoverSizeMultiplier: 3,
      width: 6,
      transition: 'all ease-out 200ms',
      cursor: 'pointer',
    },
    line: {
      color: '#fde047',
      width: 3,
    },
  })
  .start();

const svgNode = drawContainer.getElement();

if (svgNode) {
  const app = document.querySelector('#app')!;
  app.appendChild(svgNode);

  const clearNodes = () => {
    drawContainer.getNodes().forEach((node) => {
      node.remove();
      drawContainer.redraw();
    });
  };

  const getCoordinates = () => {
    const coordinates = drawContainer.getCoordinates();
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

    drawContainer.loadCoordinates(coordinates);
  };

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

  buttonsContainer.append(clearBtn);
  buttonsContainer.append(loadCoordsBtn);
  buttonsContainer.append(getCoordsBtn);

  app.append(buttonsContainer);
}
