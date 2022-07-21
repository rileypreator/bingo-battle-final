import { Component, OnInit } from '@angular/core';
import { Game } from './game.model';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  selectedGame: Game;
  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.gameSelectedEvent.subscribe((result) => {
      this.selectedGame = result;
      console.log("Selected Game", this.selectedGame);
    })

  }

}
