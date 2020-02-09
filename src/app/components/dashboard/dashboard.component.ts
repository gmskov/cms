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


  sortBy(event: any, sortByElement){
    this.articles = this.articles.filter(function(elm) {
      if(elm[sortByElement] != null && elm[sortByElement].toLowerCase().indexOf(event.target.value.toLowerCase()) != -1){
        return elm;
      }
    });
    if(event.target.value == ''){
      this.sortByTitle = '';
      this.sortByDiscription = '';
      this.sortByAuthor = '';
      this.cms.initLocalStorage().then((data)=>{
        this.articles =  data;
      });
    }
  }

  ngOnInit() {
    this.cms.initLocalStorage().then((data)=>{
      this.articles =  data;
    });
  }

}
