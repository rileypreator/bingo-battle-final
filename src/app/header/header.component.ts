import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../games/game.model';
import { GamesService } from '../games/games.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activeGame = '';
  activeGameObject: Game;
  collapse = true;
  apiKey: string;
  gameStartAlert: Subscription;
  
  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private gameService: GamesService) { }

  ngOnInit(): void {
    this.apiKey = String(environment.loginAPIKey);

    console.log("Header init");
  }
}
