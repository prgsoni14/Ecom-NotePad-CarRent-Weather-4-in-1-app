import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStarterComponent } from './e-starter.component';

describe('EStarterComponent', () => {
  let component: EStarterComponent;
  let fixture: ComponentFixture<EStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EStarterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
