import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentCardComponent } from './coment-card.component';

describe('ComentCardComponent', () => {
  let component: ComentCardComponent;
  let fixture: ComponentFixture<ComentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
