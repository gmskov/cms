import { Component, OnInit } from '@angular/core';
import { CmsServiceService } from '../../services/cms-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles: Array<any>;
  whether;
  sortByTitle;
  sortByDiscription;
  sortByAuthor;
  arrayToSport;

  constructor(private cms: CmsServiceService) {
    this.whether = false;
  }

  sortBy(){
    let title = this.sortByTitle;
    let author = this.sortByAuthor;
    let description = this.sortByDiscription;
    let articles = JSON.parse(JSON.stringify(this.arrayToSport));

    this.articles = articles.filter(function(elm) {
      if(title && elm.title != null) {
          if(elm.title.toLowerCase().indexOf(title.toLowerCase()) == -1){
            elm.visible = false;
          }
      }
      if(author && elm.author != null) {
        if(elm.author.toLowerCase().indexOf(author.toLowerCase()) == -1){
          elm.visible = false;
        }
      }
      if(description && elm.description != null) {
        if(elm.description.toLowerCase().indexOf(description.toLowerCase()) == -1){
          elm.visible = false;
        }
      }

      return elm;
    });
  }

  reloadArticle(completed): void {
    if(completed){
      this.loadArlicle();
    }
  }

  loadArlicle(): void {
    this.cms.initLocalStorage().then((data)=>{
      this.articles =  data;
      this.arrayToSport = JSON.parse(JSON.stringify(data));
    });
  }

  ngOnInit() {
    this.loadArlicle();
  }

}
