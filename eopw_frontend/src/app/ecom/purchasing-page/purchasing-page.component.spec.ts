import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingPageComponent } from './purchasing-page.component';

describe('PurchasingPageComponent', () => {
  let component: PurchasingPageComponent;
  let fixture: ComponentFixture<PurchasingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
