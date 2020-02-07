import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css";
import { EventEmitter, Output } from '@angular//core';
import { CmsServiceService } from '../../services/cms-service.service';
import { WeatherServiceService } from '../../services/weather-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  weather;
  isUserLogin;
  iconClassArray;
  iconClass;
  isWeatherVisible;
  userName;
  password;

  constructor(private cms: CmsServiceService, private ws: WeatherServiceService) {
    this.weather = {};
    this.isWeatherVisible = false;
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

  @Output() showWhetherEvent = new EventEmitter();

  showWeather(){
    this.isWeatherVisible  = !this.isWeatherVisible;
    this.showWhetherEvent.emit();
    this.ws.getWeatherByCoordinate().subscribe(data => {
      this.weather.temp =  data.main.temp;
      this.weather.img = data.weather[0].icon;
      this.iconClass = this.iconClassArray[this.weather.img];
    });
  }
  hideWeather(){
    this.isWeatherVisible  = !this.isWeatherVisible;
  }

  checkUserLogin(){
    this.isUserLogin = this.cms.isUserLogin();
  }
  userLogin(){
    this.cms.userAuth(this.userName, this.password);
    this.checkUserLogin();
  }

  userLogout(){
    this.cms.userLogout();
    this.checkUserLogin();
  }

  getUserName(){
    return this.cms.getUserName();
  }

  ngOnInit() {
      let menu = document.querySelectorAll('.sidenav');
      M.Sidenav.init(menu);
      this.checkUserLogin();
      this.ws.getCoordinate();
  }


}
