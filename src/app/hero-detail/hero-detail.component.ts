import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit{
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location)
  {}

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }


  getHero(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  changeHero() {
    this.heroService.editHero(this.hero).subscribe(() => {
      console.log("Hero updated", this.hero)})
  }
}
