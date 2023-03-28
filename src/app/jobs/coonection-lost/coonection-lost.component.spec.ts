import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoonectionLostComponent } from './coonection-lost.component';

describe('CoonectionLostComponent', () => {
  let component: CoonectionLostComponent;
  let fixture: ComponentFixture<CoonectionLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoonectionLostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoonectionLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
