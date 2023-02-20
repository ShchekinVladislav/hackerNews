import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConfigService} from '../../service/config.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

  loader: boolean = false;
  constructor(private configService: ConfigService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.configService.loader$.subscribe(res => {
      this.loader = res;
      this.cdr.markForCheck();
    });
  }

}
