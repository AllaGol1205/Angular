import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Calculator';
  buttons = [
    [
      {text: 'C', w: 2, isFunc: true},
      {text: '%', w: 1, isFunc: true},
      {text: '/', w: 1, isFunc: true},
    ], [
      {text: '7', w: 1, isFunc: false},
      {text: '8', w: 1, isFunc: false},
      {text: '9', w: 1, isFunc: false},
      {text: '*', w: 1, isFunc: true},
    ], [
      {text: '4', w: 1, isFunc: false},
      {text: '5', w: 1, isFunc: false},
      {text: '6', w: 1, isFunc: false},
      {text: '-', w: 1, isFunc: true},
    ], [
      {text: '1', w: 1, isFunc: false},
      {text: '2', w: 1, isFunc: false},
      {text: '3', w: 1, isFunc: false},
      {text: '+', w: 1, isFunc: true},
    ], [
      {text: '0', w: 1, isFunc: false},
      {text: '.', w: 1, isFunc: false},
      {text: '=', w: 2, isFunc: true},
    ]
  ];

  firstNumber: number = null;
  function: string = null;
  calNumberStr: string = null;

  resetValues() {
    this.firstNumber = null;
    this.function = null;
    this.calNumberStr = '0';
  }

  btnClick(btn: string, isFunc: boolean) {
    if (isFunc) {
      if (btn == 'C') { // Сброс
        this.resetValues();
      } else if (this.function === null) { // Переносим текущее значение в 1й операнд, запоминаем функцию, а текущее значение сбрасываем в "0"
        this.firstNumber = Number(this.calNumberStr);
        if (!isNaN(this.firstNumber)) {
          this.calNumberStr = "0";
          this.function = btn;
        }
      } else {
        let calNumber = Number(this.calNumberStr);
        if (!Number.isNaN(calNumber)) {
          if (this.function == "+")
            this.setResult(this.firstNumber + calNumber, btn);
          else if (this.function == "-")
            this.setResult(this.firstNumber - calNumber, btn);
          else if (this.function == "/")
            this.setResult(this.firstNumber / calNumber, btn);
          else if (this.function == "*")
            this.setResult(this.firstNumber * calNumber, btn);
          // Далее последует выполнение арифметического действия с firstNumber и calNumber согласно function и перенос значений между полями
        }
      }
    } else { // Не функциональная кнопка
      if (this.calNumberStr === "0") {
        this.calNumberStr = btn;
      } else {
        let calNumber = Number(this.calNumberStr + btn); // Проверяем, что получается число
        if (!Number.isNaN(calNumber))
          this.calNumberStr = this.calNumberStr + btn;
      }
    }
  }

  private setResult(numResult: number, btn: string) {
    if (btn=="=") {
      this.calNumberStr = '' + numResult;
      this.function = null;
      this.firstNumber = null;

      localStorage.setItem("LS", this.calNumberStr);
      sessionStorage.setItem("SS", this.calNumberStr);
      this.cookieService.set("CS", this.calNumberStr);

    } else {
      this.firstNumber = numResult;
      this.function = btn;
      this.calNumberStr = "0";
    }
  }

  ngOnInit(): void {
    this.resetValues();
    this.calNumberStr = this.cookieService.get("CS");
  }

  constructor(private cookieService: CookieService) {
  }
}
