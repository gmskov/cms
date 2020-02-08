import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  latitude;
  longitude;
  private whetherApiKey;

  constructor(private http: HttpClient) {
    this.whetherApiKey = env.whetherApiKey;
  }

  getCoordinate(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((ccoordinate)=>{
        this.latitude = ccoordinate.coords.latitude;
        this.longitude = ccoordinate.coords.longitude;
      });
    }
  }

  getWeatherByCoordinate() : Observable<any> {
    if(!this.latitude && !this.longitude) return;
    return this.http.get('https://api.openweathermap.org/data/2.5/weather' +
      '?lat=' + this.latitude +
      '&lon=' + this.longitude +
      '&units=metric' +
      '&APPID=' + this.whetherApiKey)
      .pipe(map(data=>{
          return data;
      }));
  }
}
