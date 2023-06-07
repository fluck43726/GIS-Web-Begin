import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignment12Component } from './assignment1.2.component';

describe('Assignment12Component', () => {
  let component: Assignment12Component;
  let fixture: ComponentFixture<Assignment12Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assignment12Component]
    });
    fixture = TestBed.createComponent(Assignment12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
