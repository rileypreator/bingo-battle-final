import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../games/game.model';
import { GamesService } from '../games/games.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  authCode: string = "";
  accessToken: string = "";
  userId: string = "";
  accessTokenObservable: any;
  accessTokenData: any;
  accessUserId: any;
  environment = environment;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpClient: HttpClient, private gameService: GamesService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.authCode = queryParams['code'];
      console.log(this.authCode);

      console.log(queryParams);
    });

    this.accessTokenObservable = this.getAccessToken();

    this.accessTokenObservable.subscribe(result => {
      console.log("Results", result);
      this.accessTokenData = JSON.parse(JSON.stringify(result));
      this.sendUserInfoHttp();
    });

    this.accessTokenObservable.then(data => {
      console.log("In then");
    });

    //redirect to viewable components
    this.router.navigate(['/games']);

    this.sendUserInfoHttp();
  }

  //Get the access token that can then be used to get the user's information
  getAccessToken():Observable<any> {
    return this.httpClient.post(this.environment.getTokensURL, {
      client_id: 'lksnbi1550zhm1j0wd37dboakvytx0',
      client_secret: 'lmbfsa6cphwxp8noeq5jzz3j9ad2vl',
      code: this.authCode,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:4200/verify'
    })
  }

  //Get the user's information from the access code that was just retrieved
  sendUserInfoHttp() {
    let oAuthValidate = this.environment.oAuthValidate;

    let headerName = 'Authorization';
    let headerValue = 'OAuth ';
    headerValue += this.accessTokenData.access_token;

    console.log(headerValue);
    let headers = new HttpHeaders()
      .set(headerName, headerValue);

    console.log(headers.get('Authorization'));
    
    const headers2 = new HttpHeaders({'Authorization': headerValue});

    console.log(headers2)
    this.httpClient.get(oAuthValidate, { headers: headers })

      .subscribe((result) => {

        console.log(result);
        this.accessUserId = JSON.parse(JSON.stringify(result));

        this.userId = this.accessUserId.user_id;
        console.log("User ID", this.userId);

        this.retrieveUserGames(this.userId);
      })
  }

  retrieveUserGames(userId: string) {
    this.httpClient.get(this.gameService.getDatabaseString(userId))
      .subscribe(
        
        (games: Game[]) => {
          console.log(typeof games);
          console.log(games);

          this.gameService.setUserId(userId);
          this.gameService.setGames(games);
          this.router.navigate(['/games']);
        },

        (error: any) => {
          console.log(error);
          this.gameService.setUserId(userId);
          this.gameService.setupNewUsers(userId);
        }
      
      );
      
  }

  ngOnDestroy() {
    // this.accessTokenObservable.unsubscribe();
  }
}
