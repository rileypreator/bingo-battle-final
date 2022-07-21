import { Component, OnInit, Renderer2 } from '@angular/core';
import { Event, Router } from '@angular/router';
import { BingoChoice } from '../games/bingoChoice.model';
import { Game } from '../games/game.model';
import { GamesService } from '../games/games.service';
import { BingoSpot } from './BingoSpot.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  activeGameString: string;
  activeGame: Game;
  bingoChoices: BingoChoice[] = [];
  rows = 5;
  freeSpace = false;
  // count = 0;

  validBingoWins: BingoSpot[][] = [];
  clickedSpots: BingoSpot[] = [];

  constructor(private gameService: GamesService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.activeGameString = this.gameService.getActiveGame();
    this.activeGame = this.gameService.getGame(this.activeGameString);

    console.log('Active game in board', this.activeGameString, this.activeGame);

    this.getBingoBoardChoices();

    this.generateValidBingoWins();
  }

  board() {
    console.log("Board");
    this.router.navigate(['/games']);
  }

  getBingoBoardChoices() {
    const randomArrayOfItems = this.activeGame.bingoChoices.sort(() => 0.5 - Math.random());

    // if (this.gameService.freeSpace) {
    // this.bingoChoices = randomArrayOfItems.slice(0, 24)
    // }
    // else {
    //   this.bingoChoices = randomArrayOfItems.slice(0, 25)
    // }

    this.bingoChoices = randomArrayOfItems.slice(0, 25);

    this.freeSpace = this.gameService.freeSpace;
    console.log("Bingo Choices", this.bingoChoices)
  }

  clickSpace(row: number, col: number, event) {
    console.log("Clicked", row, col);

    let bingoSpot = new BingoSpot(row, col);
    if (this.clickedSpots.includes(bingoSpot)) {
      console.log("Already has been clicked");
    }
    else {
      this.clickedSpots.push(new BingoSpot(row, col));
    }

    let target = event.target;
    console.log(typeof target, target);

    this.renderer.addClass(target, 'active');

    console.log("Currently clicked", this.clickedSpots);
  }

  generateValidBingoWins() {
    //horizontal wins
    let win1: BingoSpot[] = [new BingoSpot(0, 0), new BingoSpot(0, 1), new BingoSpot(0, 2), new BingoSpot(0, 3), new BingoSpot(0, 4)];
    let win2: BingoSpot[] = [new BingoSpot(1, 0), new BingoSpot(1, 1), new BingoSpot(1, 2), new BingoSpot(1, 3), new BingoSpot(1, 4)];
    let win3: BingoSpot[] = [new BingoSpot(2, 0), new BingoSpot(2, 1), new BingoSpot(2, 2), new BingoSpot(2, 3), new BingoSpot(2, 4)];
    let win4: BingoSpot[] = [new BingoSpot(3, 0), new BingoSpot(3, 1), new BingoSpot(3, 2), new BingoSpot(3, 3), new BingoSpot(3, 4)];
    let win5: BingoSpot[] = [new BingoSpot(4, 0), new BingoSpot(4, 1), new BingoSpot(4, 2), new BingoSpot(4, 3), new BingoSpot(4, 4)];

    //vertical wins
    let win6: BingoSpot[] = [new BingoSpot(0, 0), new BingoSpot(1, 0), new BingoSpot(2, 0), new BingoSpot(3, 0), new BingoSpot(4, 0)];
    let win7: BingoSpot[] = [new BingoSpot(0, 1), new BingoSpot(1, 1), new BingoSpot(2, 1), new BingoSpot(3, 1), new BingoSpot(4, 1)];
    let win8: BingoSpot[] = [new BingoSpot(0, 2), new BingoSpot(1, 2), new BingoSpot(2, 2), new BingoSpot(3, 2), new BingoSpot(4, 2)];
    let win9: BingoSpot[] = [new BingoSpot(0, 3), new BingoSpot(1, 3), new BingoSpot(2, 3), new BingoSpot(4, 3), new BingoSpot(5, 3)];
    let win10: BingoSpot[] = [new BingoSpot(0, 4), new BingoSpot(1, 4), new BingoSpot(2, 4), new BingoSpot(3, 4), new BingoSpot(4, 4)];

    //diagonal wins
    let win11: BingoSpot[] = [new BingoSpot(0, 0), new BingoSpot(1, 1), new BingoSpot(2, 2), new BingoSpot(3, 3), new BingoSpot(4, 4)];
    let win12: BingoSpot[] = [new BingoSpot(0, 4), new BingoSpot(1, 3), new BingoSpot(2, 2), new BingoSpot(3, 1), new BingoSpot(4, 0)];


    this.validBingoWins.push(win1, win2, win3, win4, win5, win6, win7, win8, win9, win10, win11, win12);
    console.log(this.validBingoWins);
  }
 
  checkWin() {
    var count = 0;
    for (let i = 0; i < this.validBingoWins.length; i++) {
      for (let j = 0; j < this.validBingoWins[i].length; j++) {
        console.log(this.clickedSpots);
        let bingoCheck = new BingoSpot(this.validBingoWins[i][j].row, this.validBingoWins[i][j].col)
        console.log("Bingo Check", bingoCheck)
        if (this.clickedSpots.find(spot => spot.row == this.validBingoWins[i][j].row && spot.col == this.validBingoWins[i][j].col)) {

          count++;
          if (count == 5) {
            console.log("We have a winner!!");
            this.router.navigate(['/won']);
          } else {
            console.log("Found ", count);
          }

        }
      }

      count = 0;
    }

  }
}
