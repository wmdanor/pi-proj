import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistrarComponent } from './edit-registrar.component';

describe('EditRegistrarComponent', () => {
  let component: EditRegistrarComponent;
  let fixture: ComponentFixture<EditRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
