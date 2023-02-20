import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../service/config.service';
import {HitsModel} from '../../model/hits.model';
import {ViewportScroller} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {isNumeric} from 'rxjs/internal-compatibility';
import {SelectChangeValue, SelectModel} from '../../model/select.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  hits: HitsModel[] = [];
  page: number = 0;
  loader: boolean = true;
  tag: string = 'front_page';
  select: SelectModel = {label: 'Tag:', ctrName: 'tag', value: 'front_page'};
  constructor(private configService: ConfigService, private viewport: ViewportScroller, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.changeLoader(true);
        if(queryParam.page && isNumeric(+queryParam.page)){
          this.page = +queryParam.page;
        }
        if(queryParam.tag){
          this.tag = queryParam.tag;
          if((this.tag !== 'story') && (this.tag !== 'poll') && (this.tag !== 'show_hn') && (this.tag !== 'ask_hn') && (this.tag !== 'front_page')){
            this.tag = 'front_page';
          }
          let newObj = Object.assign({}, this.select);
          newObj.value = this.tag;
          this.select = newObj;
        }
        this.loadNews();
      }
    );
  }

  ngOnInit(): void {
    this.changeLoader(true);
  }

  loadNews(){
    this.configService.getNews(this.page, this.tag).subscribe(res => {
      this.hits = res;
      this.changeLoader(false);
    });
  }
  nextPage(mode: boolean){
    this.changeLoader(true);
    if(mode){
      this.page = this.page + 1;
    } else {
      this.page = this.page - 1;
    }
    this.router.navigate(['/'], {queryParams: { page: this.page, tag: this.tag }});
    this.viewport.scrollToPosition([0, 0]);
  }

  changeLoader(params: boolean){
    if(params){
      this.loader = true;
      this.configService.openLoader();
    } else {
      this.loader = false;
      this.configService.closeLoader();
    }
  }

  setTag(event: SelectChangeValue){
    this.page = 0;
    this.router.navigate(['/'], {queryParams: { page: this.page, tag: event.id }});
  }

}
