import {Component, Input, OnInit} from '@angular/core';
import {HitsModel} from '../../model/hits.model';
import {ConfigService} from '../../service/config.service';
import {CommentModel} from '../../model/comment.model';
import {ActivatedRoute} from '@angular/router';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.component.html',
  styleUrls: ['./hit.component.less']
})
export class HitComponent implements OnInit {

  hit: HitsModel | undefined;
  comments: CommentModel[] = [];
  constructor(private configService: ConfigService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.configService.openLoader();
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        forkJoin([
          this.configService.getCommentByHit(id),
          this.configService.getHit(id)
        ]).subscribe(([comments, hit]) => {
          this.comments = this.configService.getCommentToComment(comments);
          this.hit = hit;
          this.configService.closeLoader();
        });
      } else {
        //показать окно с несуществующеим постом
      }
    });
  }

}
