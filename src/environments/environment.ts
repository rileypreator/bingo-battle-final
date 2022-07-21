// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  //this will generate a key to get the information that you require which will be used in the url below
  loginAPIKey: "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=lksnbi1550zhm1j0wd37dboakvytx0&redirect_uri=http://localhost:4200/verify&scope=chat:edit",

  //Use this key once you have gained the code to then get the access token
  getTokensAPIBodyBeginning: "client_id=lksnbi1550zhm1j0wd37dboakvytx0&client_secret=miud85edmdt7pphcgjcuax43gn08ix&code=",
  getTokensAPIBodyEnding: "&grant_type=authorization_code&redirect_uri=http://localhost:4200/code",
  getTokensURL: "https://id.twitch.tv/oauth2/token",

  //validate api url
  oAuthValidate: "https://id.twitch.tv/oauth2/validate"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
