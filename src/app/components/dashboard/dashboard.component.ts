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
  constructor(private cms: CmsServiceService) {
    this.whether = false;
  }

  showWhether(visible){
    this.whether = visible;
  }

  ngOnInit() {
    this.cms.initLocalStorage().then((data)=>{
      this.articles =  data;
    })
  }

}
