import { SvgDrawing } from "./lib/index";

const svgDrawing = new SvgDrawing();

const svgElement = svgDrawing.createSourceFrame("../images.jpg");

// App
const app = document.querySelector("#app");
app?.appendChild(svgElement);
