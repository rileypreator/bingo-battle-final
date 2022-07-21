import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesDetailComponent } from './games/games-detail/games-detail.component';
import { GamesEditComponent } from './games/games-edit/games-edit.component';
import { HeaderComponent } from './header/header.component';
import { GamesItemComponent } from './games/games-list/games-item/games-item.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BingoDetailComponent } from './games/games-edit/bingo-detail/bingo-detail.component';
import { AddBingoChoiceComponent } from './games/games-edit/add-bingo-choice/add-bingo-choice.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyCodeComponent } from './verify/verify-code/verify-code.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { BoardComponent } from './board/board.component';
import { BoardRowComponent } from './board/board-row/board-row.component';
import { BoardItemComponent } from './board/board-row/board-item/board-item.component';
import { WonComponent } from './won/won.component';

@NgModule({
  declarations: [
    AppComponent,
    BingoDetailComponent,
    GamesComponent,
    GamesListComponent,
    GamesDetailComponent,
    GamesEditComponent,
    HeaderComponent,
    GamesItemComponent,
    DropdownDirective,
    AddBingoChoiceComponent,
    VerifyComponent,
    VerifyCodeComponent,
    PlayGameComponent,
    BoardComponent,
    BoardRowComponent,
    BoardItemComponent,
    WonComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
