import { SvgDraw } from './lib/index';

const draw = new SvgDraw()
  .createSourceFrame({
    image: {
      src: 'https://theanimaldentalclinic.com/wp-content/uploads/2019/01/shutterstock_1048325251.jpg',
      alt: 'Patience teeth',
      objectFit: 'fill',
    },
    style: {
      width: '1000px',
      heigth: '800px',
    },
  })
  .addDrawingEvents()
  .compile({
    circleColor: 'blue',
    circleWidth: 3,
  });

const svgNode = draw.getNode();

if (svgNode) {
  const app = document.querySelector('#app')!;
  app.appendChild(svgNode);
}
