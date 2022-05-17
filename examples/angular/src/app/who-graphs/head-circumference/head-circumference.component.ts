import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LineGraphDrawing } from '@ekisa-cdk/graph-drawing';

@Component({
  selector: 'app-head-circumference',
  template: `
    <div #graphContainer></div>

    <button (click)="clearNodes()">Clear nodes</button>
    <button (click)="loadCoordinates()">Load coordinates</button>
    <button (click)="getCoordinates()">Get coordinates</button>
    <button (click)="getCoordinates()">Export as .JPG</button>
    <button (click)="getCoordinates()">Export as .PNG</button>
  `,
  styleUrls: ['./head-circumference.component.css'],
})
export class HeadCircumferenceComponent implements AfterViewInit {
  @ViewChild('graphContainer') graphContainer!: ElementRef<HTMLDivElement>;

  private _graphApi!: LineGraphDrawing;

  private _initialized = false;

  ngAfterViewInit(): void {
    this._renderGraph();
  }

  clearNodes() {
    if (this._initialized) {
      this._graphApi.getNodes()?.forEach((node) => {
        node.remove();
        this._graphApi.redraw();
      });
    }
  }

  getCoordinates() {
    const coordinates = this._graphApi.getCoordinates();
    console.log(coordinates);
    alert('Check the console');
  }

  loadCoordinates() {
    const coordinates = [
      { x: 172, y: 366, order: 2 },
      { x: 291, y: 31, order: 3 },
      { x: 426, y: 364, order: 4 },
      { x: 99, y: 156, order: 5 },
    ];

    this._graphApi.loadCoordinates(coordinates);
  }

  // const tomato = {
  //   tomato1: '#fffcfc',
  //   tomato2: '#fff8f7',
  //   tomato3: '#fff0ee',
  //   tomato4: '#ffe6e2',
  //   tomato5: '#fdd8d3',
  //   tomato6: '#fac7be',
  //   tomato7: '#f3b0a2',
  //   tomato8: '#ea9280',
  //   tomato9: '#e54d2e',
  //   tomato10: '#db4324',
  //   tomato11: '#ca3214',
  //   tomato12: '#341711',
  // }

  private _renderGraph() {
    this._graphApi = new LineGraphDrawing({
      canDrawLines: true,
      canRemoveNodes: true,
      styles: {
        line: {
          color: '#ca3214',
          width: 3,
        },
        node: {
          width: 5,
          color: '#00259e',
          hoverColor: '#ca3214',
          hoverSizeMultiplier: 2,
          cursor: 'url("https://i.stack.imgur.com/bUGV0.png"), auto',
        },
      },
    })
      .mountScopedFrame({
        image: {
          src: 'https://media.cheggcdn.com/media/3bc/3bc5fc99-47c7-44a9-aadb-1f778be80537/phpCYM9Kd.png',
          alt: 'Head circumference-for-age GIRLS',
          objectFit: 'fill',
        },
        frame: {
          width: '962px',
          heigth: '589px',
          top: '115px',
          left: '104px',
          cursor: 'default',
        },
        style: {
          width: '1200px',
          heigth: '800px',
        },
      })
      .startProcess();

    const container = this._graphApi.getContainerElement();
    this._initialized = true;

    container && this.graphContainer.nativeElement.append(container);
  }
}
