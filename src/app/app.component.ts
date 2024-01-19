import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

export interface PointWithVelocity {x:number, y: number, dx: number, dy: number}
export interface Polygon {points: PointWithVelocity[], color: string};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly MAXX = 2000;
  private readonly MAXY = 900;
  parr: Polygon[] = [];
  private move: boolean = false;
  private subscription: Subscription;

  private nextPolygon(p: Polygon, steps: number) {
    let new_p: Polygon = {points: [], color: p.color };
    for (let i = 0; i < 4; i++) { // Проходим по вершинам
      // Копируем параметры точки в локальную переменную
      let point = {x: p.points[i].x, y: p.points[i].y, dx: p.points[i].dx, dy: p.points[i].dy};
      point.x = point.x + point.dx * steps; // Сместили точку
      point.y = point.y + point.dy * steps;
      if (point.x < 0) { // Отражение. Переворачиваем скорость и возвращаем в контейнер
        point.x = -point.x;
        point.dx = -point.dx;
      } else if (point.x > this.MAXX) { // То же самое от правой стенки
        point.x = this.MAXX - (point.x - this.MAXX);
        point.dx = -point.dx;
      }
      if (point.y < 0) { // Аналогично по оси y
        point.y = -point.y;
        point.dy = -point.dy;
      } else if (point.y > this.MAXY) {
        point.y = this.MAXY - (point.y - this.MAXY);
        point.dy = -point.dy;
      }
      // Заполняем массив вершин новыми
      new_p.points.push({x: point.x, y: point.y, dx: point.dx, dy: point.dy});
    }
    return new_p;
  }

  private initPolygon(p: Polygon) {
    p.points = [];
    for (let i = 0; i < 4; i++) {
      p.points.push({
        x: Math.random() * this.MAXX,// от 0 до 2000
        y: Math.random() * this.MAXY,// от 0 до 1000
        dx: Math.random() * 20 - 10, // от -10 до 10
        dy: Math.random() * 20 - 10  // от -10 до 10
      });
    }
    console.log('initialized');
    return p;
  }

  private initPolygons() {
    this.parr = [];
    let p: Polygon = {points: [], color: "red"}
    p = this.initPolygon(p); // Первый случайный
    this.parr.push(p);
    p = this.nextPolygon(p, 10); // Второй на 10 шагов вперёд
    p.color = "green";
    this.parr.push(p);
    p = this.nextPolygon(p, 10); // Третий ещё на 10 шагов вперёд
    p.color = "blue";
    this.parr.push(p);
  }


  private movePolygon() {
    for (let i = 0; i < this.parr.length; i++) { // Проходим по массиву четырёхугольников и получаем их новые версии со смещением на 1 шаг
      this.parr[i] = this.nextPolygon(this.parr[i], 1);
    }
  }

  start() {
    if (this.parr.length===0) { // массив ещё не инициирован
      this.initPolygons();
    }
    this.move = !this.move; // Переключаем флаг
    if (this.move) {
      // метод interval возвращает Observable, который будет слать уведомления через указанное кол-во миллисекунд. На него можно подписаться и реализовать циклический вызов метода.
      this.subscription = interval(10).subscribe(i => this.movePolygon());
    } else { // когда останавливаем движение, то прекращаем и подписку
      this.subscription.unsubscribe();
    }
  }

  getPoints(p: Polygon) {
    // интерполяция значений в строке в обратных кавычнах
    return `${p.points[0].x},${p.points[0].y} ${p.points[1].x},${p.points[1].y} ${p.points[2].x},${p.points[2].y} ${p.points[3].x},${p.points[3].y}`;
  }

  ngOnInit(): void {
    setTimeout(() => this.start(), 2000);
  }

}



