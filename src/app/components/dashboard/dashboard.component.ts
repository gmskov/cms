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

  constructor(private cms: CmsServiceService) {
    this.whether = false;
  }

  showWhether(visible){
    this.whether = visible;
  }


  sortBy(){
    let title = this.sortByTitle;
    let author = this.sortByAuthor;
    let description = this.sortByDiscription;
    let articles = JSON.parse(localStorage.getItem('articles'));

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

  ngOnInit() {
    this.cms.initLocalStorage().then((data)=>{
      this.articles =  data;
    });
  }

}
