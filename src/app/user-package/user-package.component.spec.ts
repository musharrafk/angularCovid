import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPackageComponent } from './user-package.component';

describe('UserPackageComponent', () => {
  let component: UserPackageComponent;
  let fixture: ComponentFixture<UserPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
