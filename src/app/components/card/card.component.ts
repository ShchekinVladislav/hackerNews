import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {HitsModel} from '../../model/hits.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  hit: HitsModel | undefined;
  @Input() set setHit(hit: HitsModel){
    this.hit = hit;
  }
  constructor() { }

  ngOnInit(): void {
  }


}
