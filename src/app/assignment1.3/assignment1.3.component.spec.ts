import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignment13Component } from './assignment1.3.component';

describe('Assignment13Component', () => {
  let component: Assignment13Component;
  let fixture: ComponentFixture<Assignment13Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assignment13Component]
    });
    fixture = TestBed.createComponent(Assignment13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
