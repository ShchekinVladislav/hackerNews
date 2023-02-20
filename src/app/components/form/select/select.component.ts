import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SelectChangeValue, SelectList, SelectListItem, SelectModel} from '../../../model/select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {

  selectList: SelectListItem[] = SelectList;
  select: SelectModel | undefined;
  value: SelectListItem | undefined;
  showList: boolean = false;
  @Input() set setSelect(config: SelectModel) {
    this.select = config;
    let fItem = this.selectList.find(res => res.id === this.select?.value);
    if(fItem){
      this.value = fItem;
    } else {
      this.value = {name: 'Front page', id: 'front_page'};
    }
  }
  @Output() changeSelectValue: EventEmitter<SelectChangeValue> = new EventEmitter<SelectChangeValue>();
  @HostListener('document:click', ['$event'])
  closeList(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showList = false;
    }
  }
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  setValue(value: SelectListItem){
    if(this.select){
      this.value = value;
      this.changeSelectValue.emit({id: value.id, ctrName: this.select.ctrName});
    }
    this.showList = false;
  }


  openList() {
    this.showList = this.showList ? false : true;
  }

}
