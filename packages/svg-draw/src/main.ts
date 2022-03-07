import { SvgDraw } from './lib/index';

const draw = new SvgDraw()
  .createSourceFrame({
    image: {
      src: 'https://theanimaldentalclinic.com/wp-content/uploads/2019/01/shutterstock_1048325251.jpg',
      alt: 'Patience teeth',
      objectFit: 'fill',
    },
    style: {
      width: '600px',
      heigth: '400px',
    },
  })
  .addDrawingEvents()
  .compile({
    circle: {
      color: '#1d4ed8',
      hoverColor: '#e11d48',
      hoverSizeMultiplier: 6,
      width: 6,
      transition: 'all ease-out 200ms',
      cursor: 'pointer',
    },
    line: {
      color: '#fde047',
      width: 3,
    },
  });

const svgNode = draw.getNode();

if (svgNode) {
  const app = document.querySelector('#app')!;
  app.appendChild(svgNode);
}
