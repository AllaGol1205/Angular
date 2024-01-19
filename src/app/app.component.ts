import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  backgroundColor: string = "#FFF";
  step = 2;

  getColor(i: number, j: number) {
    switch (i) {
      case 0: return `rgb(${255-j*this.step}, ${255-j*this.step}, ${255-j*this.step})`; // silver
      case 1: return `rgb(255, ${255-j*this.step}, ${255-j*this.step})`;                // red
      case 2: return `rgb(${255-j*this.step}, 255, ${255-j*this.step})`;                // green
      case 3: return `rgb(${255-j*this.step}, ${255-j*this.step}, 255)`;                // blue
      case 4: return `rgb(255, 255, ${255-j*this.step})`;                               // yellow
      case 5: return `rgb(255, ${255-j*this.step}, 255)`;                               // violet
      case 6: return `rgb(${255-j*this.step}, 255, 255)`;                               // cian
      case 7: return `rgb(${j*this.step}, ${j*this.step}, ${j*this.step})`;             // silver
      case 8: return `rgb(${j*this.step}, 0, 0)`;                                       // red
      case 9: return `rgb(0, ${j*this.step}, 0)`;                                       // green
     case 10: return `rgb(0, 0, ${j*this.step})`;                                       // blue
     case 11: return `rgb(${j*this.step}, ${j*this.step}, 0)`;                          // yellow
     case 12: return `rgb(${j*this.step}, 0, ${j*this.step})`;                          // violet
     case 13: return `rgb(0, ${j*this.step}, ${j*this.step})`;                          // cian
     default: return "#FFF";
    }
  }

  click(i, j) {
    this.backgroundColor = this.getColor(i, j);
  }
}
