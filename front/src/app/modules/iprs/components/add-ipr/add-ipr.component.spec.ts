import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIprComponent } from './add-ipr.component';

describe('AddIprComponent', () => {
  let component: AddIprComponent;
  let fixture: ComponentFixture<AddIprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
