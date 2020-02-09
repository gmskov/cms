import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CmsServiceService {

  url;
  isUserAdmin;
  userName;
  userEmail;

  constructor() {
    this.url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=47088d4b80ee4c8da3cf1c0ae2a34c00';
  }

  initLocalStorage(): Promise<any>{
    return new Promise((resolve) => {
      if(!localStorage.getItem('articles')){
        this.fetchArticle().then(
          json => {
            let i = 0;
            let newsArray = json.articles.map(function (elm) {
              i++;
              return {
                id: i,
                author: elm.author,
                title: elm.title,
                description: elm.description,
                urlToImage: elm.urlToImage,
                publishedAt:  moment(elm.publishedAt).format("DD.MM.YYYY"),
                content: elm.content,
                visible: true
              };
            });
            localStorage.setItem('articles', JSON.stringify(newsArray));
            resolve(newsArray);
          }
        );
      }
      else{
        resolve(JSON.parse(localStorage.getItem('articles')));
      }
    });
  }

  getNewsById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      let newsArray = JSON.parse(localStorage.getItem('articles'));
      let newsIndex = newsArray.findIndex(item => item.id === +id);
      if(newsIndex != -1){
        resolve(newsArray[newsIndex]);
      }
      else{
        reject();
      }
    })
  }

  fetchArticle():Promise<any> {
    return fetch(this.url)
      .then(response => response.json());
  }

  checkIsUserAdmin(): boolean {
    return this.isUserAdmin;
  }

  isUserLogin(): boolean{
    if(this.userName && this.userEmail){
      return true;
    }
    else{
      return false;
    }
  }

  getUserName(): string {
    return this.userName;
  }
  getUserMail(): string {
    return this.userEmail;
  }

  signOutUser(): void{
    this.userName = null;
    this.userEmail = null;
    this.isUserAdmin = false;
  }

  checkUserAdmin(): boolean {
    if (this.isUserAdmin)  return this.isUserAdmin
    return false;
  }

  checkAminLogin(name, password): boolean {
    if( name === env.user && password === env.password) {
      this.userName = name;
      this.userEmail = 'admin@gmail.com';
      this.isUserAdmin = true;
      return true;
    }
    else return false;
  }

  updateNewsArticle(news): void {
    let articles = JSON.parse(localStorage.getItem('articles'));
    let newsIndex = articles.findIndex(item => item.id === +news.id);
    articles[newsIndex] = {
      id: news.id,
      author: (news.author != null) ? news.author : 'unknown',
      title: news.title,
      description: news.description,
      urlToImage: news.urlToImage,
      publishedAt: news.publishedAt,
      content: news.content
    };
    localStorage.setItem('articles', JSON.stringify(articles));
  }
}
