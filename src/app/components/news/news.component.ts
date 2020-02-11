import { Component, OnInit } from '@angular/core';
import { CmsServiceService } from '../../services/cms-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthProviderService } from '../../services/auth-provider.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news;
  isLoaded;
  canEdit;
  isEdit;
  newsId;
  articleSave;
  secondsToRedirect;

  constructor(private cms: CmsServiceService,
              private route: ActivatedRoute,
              private router: Router,
              public auth: AuthProviderService) {
    this.isLoaded = false;
    this.isEdit = false;
    this.articleSave = false;
  }
  editArticle(){
    this.isEdit = true;
  }

  save(){
    this.cms.updateNewsArticle(this.news);
    this.articleSave = true;
    this.secondsToRedirect = 5;
    setInterval(() => {
      if(this.secondsToRedirect == 0){
        this.router.navigate(['dashboard']);
      }
      this.secondsToRedirect--;
    }, 1000);

  }

  ngOnInit() {
      this.route.paramMap.subscribe(data => {
        this.cms.getNewsById(data.get('id')).then((news)=>{
          if(news){
            this.newsId = news.id;
            this.news = news;
            this.isLoaded = true;
          }
        })
      });
      if(this.cms.checkIsUserAdmin()){
        this.canEdit = true;
      }
    }

}
