import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor( private heroService: HeroService, private messageService: MessageService) {}
  getHeroes(){
    console.log('P1');
    this.heroService.getHeroes().subscribe(
      heroes => {
        console.log('P2');
        this.messageService.add('HeroService: fetched heroes');
        this.heroes = heroes;
      }
    );
    console.log('P3');
  }

  ngOnInit(){
    this.getHeroes();
  }
}


