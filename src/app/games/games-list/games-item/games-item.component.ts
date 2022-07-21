import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../game.model';

@Component({
  selector: 'app-games-item',
  templateUrl: './games-item.component.html',
  styleUrls: ['./games-item.component.css']
})
export class GamesItemComponent implements OnInit {

  @Input() game: Game;
  
  constructor() { }

  ngOnInit(): void {
  }

}
