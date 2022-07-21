import { Component, Input, OnInit } from '@angular/core';
import { BingoChoice } from 'src/app/games/bingoChoice.model';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.css']
})
export class BoardRowComponent implements OnInit {

  constructor() { }
  @Input() bingoChoices: BingoChoice[];

  ngOnInit(): void {
  }

}
