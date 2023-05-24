import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EHomeComponent } from './e-home.component';

describe('EHomeComponent', () => {
  let component: EHomeComponent;
  let fixture: ComponentFixture<EHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
