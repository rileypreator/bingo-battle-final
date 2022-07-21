import { Component, Input, OnInit } from '@angular/core';
import { BingoChoice } from '../../bingoChoice.model';
import { GamesService } from '../../games.service';
import { Game } from '../../game.model';

@Component({
  selector: 'app-bingo-detail',
  templateUrl: './bingo-detail.component.html',
  styleUrls: ['./bingo-detail.component.css']
})
export class BingoDetailComponent implements OnInit {

  @Input() bingoChoice: BingoChoice;
  @Input() game: Game;
  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
  }

  deleteBingoChoice() {
    this.gameService.deleteBingoChoice(this.game.id, this.bingoChoice);  
  }
}
