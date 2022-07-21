import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  games: Game[] = [];
  subscription: Subscription;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games = this.gamesService.getGames();
    this.gamesService.gameChangedEvent.subscribe((result) => {
      this.games = result;
    })

    this.subscription = this.gamesService.gamesListChangedEvent.subscribe((gamesList: Game[]  ) => {
      this.games = gamesList;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
