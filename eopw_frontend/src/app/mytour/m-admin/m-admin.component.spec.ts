import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAdminComponent } from './m-admin.component';

describe('MAdminComponent', () => {
  let component: MAdminComponent;
  let fixture: ComponentFixture<MAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
