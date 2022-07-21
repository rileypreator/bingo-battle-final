import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BingoChoice } from '../bingoChoice.model';
import { Game } from '../game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games-edit',
  templateUrl: './games-edit.component.html',
  styleUrls: ['./games-edit.component.css']
})
export class GamesEditComponent implements OnInit {

  //variables used to control the form that is being completed by the user
  originalGame: Game;
  game: Game;
  editMode: boolean = false;
  bingoChoices: BingoChoice[] = [];
  addBingoChoice: string;
  gameId: string;

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params["id."];

      //check to make sure that the ID is already not in use
      if (!this.gameId) {
        this.editMode = false;
        this.gameId = this.gameService.getMaxId().toString();
        return;
      }

      this.originalGame = this.gameService.getGame(this.gameId);
      //check to make sure that the game exists
      if (!this.originalGame) {
        return;
      }

      this.editMode = true;
      this.game = JSON.parse(JSON.stringify(this.originalGame));

      if (this.game.bingoChoices) {
        this.bingoChoices = this.originalGame.bingoChoices;
      }

    });
  }

  onGameSubmit(form: NgForm) {
    let returnValue = form.value;
    let newGame = new Game("", returnValue.name, returnValue.description, this.bingoChoices);

    if (this.editMode == false) {
      this.gameService.addGame(newGame);
    }
    else {
      console.log("Original Game", this.originalGame);
      console.log("New Game", newGame);
      this.gameService.updateGame(this.originalGame, newGame);
    }
    
    let json = JSON.stringify(this.gameService.getGames());
  }

  deleteGame() {
    this.gameService.deleteGame(this.originalGame);
  }

  bingoChoiceAdded() {

    //Check to make see if we are editing a current game, or adding to a new game
    if (this.editMode) {

      let bingoChoiceId = this.originalGame.bingoChoices.length + 1;

      let bingoChoiceToAppend = new BingoChoice(String(bingoChoiceId), this.addBingoChoice);

      this.gameService.addBingoChoice(this.originalGame.id, bingoChoiceToAppend);
      return;
    }



  }

}
