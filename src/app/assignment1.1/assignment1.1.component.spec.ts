import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignment11Component } from './assignment1.1.component';

describe('Assignment11Component', () => {
  let component: Assignment11Component;
  let fixture: ComponentFixture<Assignment11Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assignment11Component]
    });
    fixture = TestBed.createComponent(Assignment11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
