import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css";
import { CmsServiceService } from '../../services/cms-service.service';
import { WeatherServiceService } from '../../services/weather-service.service';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  weather;
  iconClassArray;
  iconClass;
  isWeatherVisible;
  userId;
  userName;
  userEmail;
  isUserLogin;
  password;
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private cms: CmsServiceService,
              private ws: WeatherServiceService,
              private authService: AuthService) {
    this.weather = {};
    this.isWeatherVisible = false;
    this.userName = this.cms.getUserName();
    this.userEmail = this.cms.getUserMail();
    this.iconClassArray = {
      '01d': 'wi-day-sunny',
      '02d': 'wi-day-cloudy',
      '03d': 'wi-cloud',
      '04d': 'wi-cloudy',
      '09d': 'wi-showers',
      '10d': 'wi-day-rain-mix',
      '11d': 'wi-thunderstorm',
      '13d': 'wi-snow',
      '50d': 'wi-fog',
      '01n': 'wi-night-clear',
      '02n': 'wi-night-alt-cloudy',
      '03n': 'wi-night-alt-cloudy-high',
      '04n': 'wi-cloudy',
      '09n': 'wi-night-alt-sprinkle',
      '10n': 'wi-night-alt-showers',
      '11n': 'wi-night-alt-thunderstorm',
      '13n': 'wi-night-alt-snow',
      '50n': 'wi-night-fog'
    };
  }
  showWeather(){
    this.isWeatherVisible  = !this.isWeatherVisible;
    this.ws.getWeatherByCoordinate().subscribe(data => {
      this.weather.temp =  Math.round(data.main.temp);
      this.weather.img = data.weather[0].icon;
      this.iconClass = this.iconClassArray[this.weather.img];
    });
  }
  hideWeather(){
    this.isWeatherVisible  = !this.isWeatherVisible;
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if(this.user){
      this.user = null;
      this.authService.signOut();
    }
    this.isUserLogin = false;
    this.userName = null;
    this.userEmail = null;
    this.cms.signOutUser();

  }

  userLogin(){
    if(this.userName && this.password){
      if(this.cms.checkAminLogin(this.userName, this.password)){
        this.isUserLogin = this.cms.isUserLogin();
        this.userName = this.cms.getUserName();
        this.userEmail = this.cms.getUserMail();
      }
    }
  }

  ngOnInit() {
    let menu = document.querySelectorAll('.sidenav');
    M.Sidenav.init(menu);
    this.ws.getCoordinate();
        this.authService.authState.subscribe((user) => {
        if(user){
          this.userName = user.name;
          this.userEmail = user.email;
          this.user = user;
          this.isUserLogin = true;
          this.cms.setUserProps(user.name,user.email)
        }
        this.loggedIn = (user != null);
      });
    this.isUserLogin = this.cms.isUserLogin();
  }
}
