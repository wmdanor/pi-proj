import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IprsComponent } from './iprs.component';

describe('IprsComponent', () => {
  let component: IprsComponent;
  let fixture: ComponentFixture<IprsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IprsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IprsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
