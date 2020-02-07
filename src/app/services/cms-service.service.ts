import { Injectable } from '@angular/core';
import { IUser } from '../interface/article';
import { environment as env } from '../../environments/environment';
import {Observable} from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsServiceService {

  url;
  userLogin: IUser;

  constructor() {
    this.url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=47088d4b80ee4c8da3cf1c0ae2a34c00'
  }

  initLocalStorage(): void{
    if(!localStorage.getItem('articles')){
      this.fetchArticle().then(
        json => {
          localStorage.setItem('articles', JSON.stringify(json.articles.slice(0, 10)));
        }
      );
    }
  }

  getArticlesFromLocalStorage(): Observable<any[]> {
    return of(JSON.parse(localStorage.getItem('articles')));
  }

  fetchArticle():Promise<any> {
    return fetch(this.url)
      .then(response => response.json());
  }

  userAuth(name, password){
      if(name == env.user && password == env.password){
        this.userLogin = {
          login: name
        };
      }
  }

  isUserLogin(){
    if (this.userLogin == undefined) return false;
    return true;
  }

  userLogout(){
    this.userLogin = undefined;
  }

  getUserName(){
    return this.userLogin.login;
  }

}
