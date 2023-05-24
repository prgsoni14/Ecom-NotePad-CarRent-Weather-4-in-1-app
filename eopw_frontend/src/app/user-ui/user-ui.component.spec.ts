import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUIComponent } from './user-ui.component';

describe('UserUIComponent', () => {
  let component: UserUIComponent;
  let fixture: ComponentFixture<UserUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
