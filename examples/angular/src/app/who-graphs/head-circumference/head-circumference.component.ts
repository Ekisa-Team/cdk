import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LineGraphDrawing } from '@ekisa-cdk/graph-drawing';

@Component({
  selector: 'app-head-circumference',
  template: `
    <button (click)="clearNodes()">Clear nodes</button>
    <button (click)="loadCoordinates()">Load coordinates</button>
    <button (click)="getCoordinates()">Get coordinates</button>
    <button (click)="exportAsJpeg()">Export as .JPG</button>
    <button (click)="exportAsPng()">Export as .PNG</button>

    <div #graphContainer style="overflow-x: scroll"></div>
    <img #exportedGraph alt="Exported graph" />
  `,
  styleUrls: ['./head-circumference.component.css'],
})
export class HeadCircumferenceComponent implements AfterViewInit {
  @ViewChild('graphContainer') graphContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('exportedGraph') exportedGraph!: ElementRef<HTMLImageElement>;

  private _graph!: LineGraphDrawing;

  ngAfterViewInit(): void {
    this._renderGraph();
  }

  clearNodes() {
    this._graph.getNodes()?.forEach((node) => {
      node.remove();
      this._graph.redraw();
    });
  }

  getCoordinates() {
    const coordinates = this._graph.getCoordinates();
    console.log(coordinates);
    alert('Check the console');
  }

  loadCoordinates() {
    const coordinates = [
      { x: 338, y: 280, order: 0 },
      { x: 665, y: 279, order: 1 },
      { x: 340, y: 492, order: 2 },
      { x: 488, y: 139, order: 3 },
      { x: 645, y: 492, order: 4 },
      { x: 327, y: 278, order: 5 },
    ];

    this._graph.loadCoordinates(coordinates);
  }

  async exportAsJpeg() {
    const base64 = await this._graph.exportAs('image/jpeg', { scale: 1.2 });
    this.exportedGraph.nativeElement.src = base64;
    console.log(base64);
  }

  async exportAsPng() {
    const base64 = await this._graph.exportAs('image/png');
    this.exportedGraph.nativeElement.src = base64;
    console.log(base64);
  }

  private _renderGraph() {
    this._graph = new LineGraphDrawing({
      canDrawLines: true,
      canRemoveNodes: true,
      styles: {
        line: {
          color: '#ca3214',
          width: 4,
        },
        node: {
          shape: 'pathX',
          width: 6,
          color: '#00259e',
          hoverColor: '#ca3214',
          hoverSizeMultiplier: 2,
        },
      },
    })
      .mountScopedFrame({
        image: {
          src: 'assets/images/girls-head-circumference-for-age.png',
          alt: 'Head circumference-for-age GIRLS',
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

    const container = this._graph.getContainerElement();
    container && this.graphContainer.nativeElement.append(container);
  }
}
