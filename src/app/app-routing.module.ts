import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { GamesDetailComponent } from "./games/games-detail/games-detail.component";
import { GamesEditComponent } from "./games/games-edit/games-edit.component";
import { GamesComponent } from "./games/games.component";
import { VerifyCodeComponent } from "./verify/verify-code/verify-code.component";
import { VerifyComponent } from "./verify/verify.component";
import { WonComponent } from "./won/won.component";

const appRoutes: Routes = [
    {
        path: '', redirectTo: '/games', pathMatch: 'full'
    },

    {
        path: 'games', component: GamesComponent, children:
        [
            {   path: 'new', component: GamesEditComponent},
            {   path: ':id', component: GamesDetailComponent},
            {   path: ':id./edit', component: GamesEditComponent}
            
        ]
    },
    {
        path: 'verify', component: VerifyComponent
    },
    {
        path: 'code', component: VerifyCodeComponent
    },
    {
        path: 'board', component: BoardComponent
    },
    {
        path: 'won', component: WonComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}