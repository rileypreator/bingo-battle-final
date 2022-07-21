import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BingoChoice } from './bingoChoice.model';
import { Game } from './game.model';
import { MOCKGAMES } from './MOCKGAMES';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  //Variables
  games: Game[] = [];
  gamesListChangedEvent = new Subject<Game[]>();
  maxGameId: number;
  userId: string = "";
  activeGame: string = "";
  freeSpace: boolean = false;

  //Event Emitter to changing the selected Game information that is shown
  @Output() gameSelectedEvent = new EventEmitter<Game>();

  //Event Emitter used to notify when any game is changed
  @Output() gameChangedEvent = new EventEmitter<Game[]>();

  //Subject to update the list of bingo choices on a game
  bingoChoiceAddedEvent = new Subject<Game[]>();
  

  constructor(private httpClient: HttpClient) {
    //Change this to match what each person's account will contain
    this.games = MOCKGAMES;
    this.maxGameId = this.getMaxId();
  }

  //Gets the highest Id of the last object in the string
  getMaxId(): number {
    let maxId = 0;

    this.games.forEach((game) => {
      let currentId = parseInt(game.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  //TODO: Change so that this gets the information from the database
  getGames() {
    return this.games;
  }

  getGame(id: string): Game {
    return this.games.find((game) => game.id === id);
  }

  //Adds a game to the end with the lowest possible ID
  addGame(newGame: Game) {
    if (!newGame) {
      return;
    }

    this.maxGameId++;
    newGame.id = this.maxGameId.toString();

    this.games.push(newGame);
    console.log(newGame);

    this.storeGames();
  }

  //Sets all of the games. This will only be called by the verify component as it will need to reset the game information 
  setGames(games: Game[]) {
    this.games = games;
  }


  setUserId(userId: string) {
    this.userId = userId;
  }
  
  //updates an already existing game in the array
  updateGame(originalGame: Game, newGame: Game) {
    if (!originalGame || !newGame) {
      return;
    }

    let position = this.games.indexOf(originalGame);

    console.log(position)
    if (position < 0) {
      return;
    }

    console.log("Past if");
    newGame.id = originalGame.id;
    this.games[position] = newGame;

    console.log("Update game games", this.games);
    this.storeGames();
  }

  //Deletes a game from the array
  deleteGame(game: Game) {
    if (!game) {
      return;
    }

    const position = this.games.indexOf(game);
    if (position < 0) {
      return;
    }

    this.games.splice(position, 1);
    this.storeGames();
  }

  //adds a bingo choice to a passed in game
  addBingoChoice(id: string, bingoChoice: BingoChoice) {

    let gameId = Number(id) - 1;
    this.games[gameId].bingoChoices.push(JSON.parse(JSON.stringify(bingoChoice)));

    this.storeGames();
  }


  //deletes a bingo choice from a passed in game along with the choice to be deleted.
  deleteBingoChoice(id: string, bingoChoice: BingoChoice) {
    let gameId = Number(id) - 1;

    const position = this.games[gameId].bingoChoices.indexOf(bingoChoice);

    if (position < 0) {
      return;
    }

    this.games[gameId].bingoChoices.splice(position, 1);
    //this.storeGames();

    this.adjustChoiceIds(gameId, bingoChoice.id);
  }

  //If a choice is deleted, adjust all of the Ids so that they are in descending order with no missed numbers
  adjustChoiceIds(id: number, deletedChoiceId: string) {
    let gameId = id;
    let choiceId = Number(deletedChoiceId);

    this.games[gameId].bingoChoices.forEach((value, index) => {
      let valueNumber = Number(value.id);

      //if the result is greater, then return to next iteration of array
      if (valueNumber < choiceId) {
        return;
      }
      //lower the value if they are greater than the deleted choice id
      else {
        let newId = Number(value.id);
        newId--;
        this.games[gameId].bingoChoices[index].id = String(newId);
      }
    });

    this.storeGames();
    console.log("After Store", this.games);
  }

    //Updates the games by storing them in the local memory along with the database
    storeGames() {

      console.log("In store games");
      let JSONgames = JSON.stringify(this.games);

      let headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      this.bingoChoiceAddedEvent.next(this.games.slice())

      //if the user exists then update their current list of games
      if (this.userId) {
        this.httpClient.put(this.getDatabaseString(this.userId), JSONgames ,{headers: headers})
        .subscribe(() => {
          this.gamesListChangedEvent.next(this.games.slice());
          console.log("Updated games for the user,", this.games);
        }
        );
      }
    }

    //Create new set of data for new users
    setupNewUsers(userId: string) {

      let headers = new HttpHeaders({'Content-Type': 'application/json'});

      let defaultJSONGames = JSON.parse(JSON.stringify(MOCKGAMES));
      this.httpClient.put(this.getDatabaseString(this.userId), defaultJSONGames ,{headers: headers})
      .subscribe(() => {
        this.gamesListChangedEvent.next(this.games.slice())
      }
      );
    }

    // Gets the string for the database
    getDatabaseString(userId: string) {
      let databaseString = "https://bingo-battle-2c850-default-rtdb.firebaseio.com/0/";
      databaseString += userId;
      databaseString += '.json';

      return databaseString;
    }

    startGame(game: Game) {
      this.activeGame = String(game.id);
      this.freeSpace = false;
    }

    startGameFree(game: Game) {
      this.activeGame = String(game.id);
      this.freeSpace = true;
    }

    getActiveGame(): string {
      return this.activeGame;
    }
}
