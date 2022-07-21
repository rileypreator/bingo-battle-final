import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bingo-choice',
  templateUrl: './add-bingo-choice.component.html',
  styleUrls: ['./add-bingo-choice.component.css']
})
export class AddBingoChoiceComponent implements OnInit {

  addBingoChoice: string;

  constructor() { }

  ngOnInit(): void {
  }


  bingoChoiceAdded() {

    //Check to make see if we are editing a current game, or adding to a new game
    // if (this.editMode) {

    //   let bingoChoiceToAppend = new BingoChoice(this.originalGame[this.originalGame.bingoChoices.length-1], this.addBingoChoice);
    //   this.gameService.addBingoChoice(this.originalGame.id, bingoChoiceToAppend);
    //   return;
    // }


  }
}
