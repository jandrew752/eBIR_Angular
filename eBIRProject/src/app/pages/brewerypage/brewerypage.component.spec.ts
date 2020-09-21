import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewerypageComponent } from './brewerypage.component';

describe('BrewerypageComponent', () => {
  let component: BrewerypageComponent;
  let fixture: ComponentFixture<BrewerypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewerypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewerypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
