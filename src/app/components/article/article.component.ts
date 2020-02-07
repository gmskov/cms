import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from '../../interface/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor() { }
  @Input() article: any;

  ngOnInit() {
  }

}
