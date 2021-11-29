import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistrarComponent } from './add-registrar.component';

describe('AddRegistrarComponent', () => {
  let component: AddRegistrarComponent;
  let fixture: ComponentFixture<AddRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
