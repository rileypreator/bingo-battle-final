import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { BingoChoice } from '../bingoChoice.model';
import { Game } from '../game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent implements OnInit {

  //variables
  nativeWindow: any;
  game: Game;
  bingoChoices: BingoChoice[] = [];

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute, private windRefService: WindRefService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((event) => {
      this.game = this.gameService.getGame(event['id']);
      this.bingoChoices = this.game.bingoChoices;
    });

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onSort() {

  }

  deleteGame() {
    this.gameService.deleteGame(this.game);
  }

  startGame() {
    console.log("Starting Game", this.game);

    this.gameService.startGame(this.game);
    this.router.navigate(['/board']);
  }

  startGameFree() {
    console.log("Starting Game", this.game);

    this.gameService.startGameFree(this.game);
    this.router.navigate(['/board']);
  }
}
