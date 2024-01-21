import {Injectable} from '@angular/core';
import {firstValueFrom, map, Observable} from "rxjs";
import {MessageService} from "./message.service";
import {Hero} from "./hero";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly FIREBASE_URL = "https://tourofheroesalla-default-rtdb.firebaseio.com/";

  constructor(private messageService: MessageService, private http: HttpClient) {  }

  getHeroes() {
    return this.http
      .get<{[key: string]: Hero}>(this.FIREBASE_URL + "hero.json")       // Возвращает Observable
      .pipe(                                      // Pipe добавляет функциональность перед вызовом subscribe
        map(respose => { // map используется для преобразования response
          const arr: Hero[] = [];
          for (const key in respose) {
            if (respose.hasOwnProperty(key)) {
              arr.push({...respose[key], id: key});
            }
          }
          return arr; // map преобразовал response в массив Hero[]
        })
      );
  }

  getHero(id: string): Observable<Hero> {
    return this.http
      .get<Hero>(this.FIREBASE_URL + "hero/" + id + ".json")
      .pipe(map(hero => {
        hero.id = id;
        return hero;
      }));
  }



  addHero(hero: Hero) {
    return this.http
      .post<{name:string}>(this.FIREBASE_URL + "hero.json", hero);
  }

  editHero(hero: Hero) {
    return this.http.put(this.FIREBASE_URL + "hero/" + hero.id + ".json", {"name": hero.name});
  }

  deleteHero(hero: Hero) {
    return this.http.delete(this.FIREBASE_URL + "hero/" + hero.id + ".json");
  }

  deleteHeroes() {
    console.log("Deleting all heroes");
    return this.http.delete(this.FIREBASE_URL + "hero.json");
  }

  test() {
     let local_heroes: Hero[];
    firstValueFrom(this.deleteHeroes()).then(
      () => firstValueFrom(this.addHero({name: "MyHero1"})).then(
        () => firstValueFrom(this.addHero({name: "MyHero2"})).then(
          () => firstValueFrom(this.addHero({name: "MyHero3"})).then(
            () => firstValueFrom(this.getHeroes()).then(heroes => {
                console.log('Массив', heroes);
                local_heroes = heroes;
                console.log(`Меняем имя ${local_heroes[0].name} на AAA`);
              local_heroes[0].name = "AAA";
                firstValueFrom(this.editHero(local_heroes[0])).then(
                  () => firstValueFrom(this.deleteHero(local_heroes[1])).then(() => {
                    console.log("Done")
                  })
                )
              }
            )
          )
        )
      )
    );
  }

}
