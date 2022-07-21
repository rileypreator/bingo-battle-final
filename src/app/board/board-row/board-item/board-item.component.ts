import { Component, Input, OnInit } from '@angular/core';
import { BingoChoice } from 'src/app/games/bingoChoice.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {

  @Input() bingoChoices: BingoChoice[];
  constructor() { }

  ngOnInit(): void {
  }

}
