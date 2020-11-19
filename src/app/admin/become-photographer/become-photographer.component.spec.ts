import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomePhotographerComponent } from './become-photographer.component';

describe('BecomePhotographerComponent', () => {
  let component: BecomePhotographerComponent;
  let fixture: ComponentFixture<BecomePhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomePhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomePhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
