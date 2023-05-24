import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MStarterComponent } from './m-starter.component';

describe('MStarterComponent', () => {
  let component: MStarterComponent;
  let fixture: ComponentFixture<MStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MStarterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
