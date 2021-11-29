import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIprComponent } from './edit-ipr.component';

describe('EditIprComponent', () => {
  let component: EditIprComponent;
  let fixture: ComponentFixture<EditIprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
