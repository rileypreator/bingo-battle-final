export const environment = {
  production: true,

  //this will generate a key to get the information that you require which will be used in the url below
  loginAPIKey: "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=lksnbi1550zhm1j0wd37dboakvytx0&redirect_uri=http://localhost:3000/verify&scope=chat:edit",

  //Use this key once you have gained the code to then get the access token
  getTokensAPIBodyBeginning: "client_id=lksnbi1550zhm1j0wd37dboakvytx0&client_secret=miud85edmdt7pphcgjcuax43gn08ix&code=",
  getTokensAPIBodyEnding: "&grant_type=authorization_code&redirect_uri=http://localhost:3000/code",
  getTokensURL: "https://id.twitch.tv/oauth2/token",

  //validate api url
  oAuthValidate: "https://id.twitch.tv/oauth2/validate"
};
