import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommentModel} from '../../model/comment.model';

@Component({
  selector: 'app-coment-card',
  templateUrl: './coment-card.component.html',
  styleUrls: ['./coment-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComentCardComponent implements OnInit {

  comment: CommentModel | undefined;
  @Input() set setComment(comment: CommentModel){
    this.comment = comment;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
