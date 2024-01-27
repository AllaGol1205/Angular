import {Component, Input} from '@angular/core';

class Student {
  constructor(public name: string, public age: number, public learn: boolean) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  board: number[][];
  posX: number;
  posY: number;
  c:number;
  error: boolean = false;

  cleanBoard() {
    this.board= [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]];

    this.posX = 4;
    this.posY = 4;
    this.board[this.posX][this.posY] = 1;
    this.c = 1;

  }

  constructor() {
   this.cleanBoard();
  }


  // move($event: MouseEvent) {
  //   console.log($event);
  // }
  move(i: number, j: number) {
    console.log(i, j, this.board[7][1]);
    let dX = Math.abs( i-this.posX);
    let dY = Math.abs( j-this.posY);
    if(!(dX === 2 && dY === 1 || dX === 1 && dY === 2)){
      this.error = true;
      return;
    }

    if(this.board[i][j] != 0){
      this.error = true;
      return;
    }

    this.error = false;
    this.c++;
    this.board[i][j] = this.c;
    this.posX = i;
    this.posY = j;

  }
}



