import { Component, OnInit } from '@angular/core';
import { CustomPoint } from '../locator/locator.model';

@Component({
  selector: 'assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css'],
})
export class Assignment2Component implements OnInit {
  locate: CustomPoint = new CustomPoint();

  ngOnInit(): void {
    console.log(this.locate);
  }

  onLocate(event: CustomPoint) {
    this.locate = event;
    console.log(this.locate);
  }
}
