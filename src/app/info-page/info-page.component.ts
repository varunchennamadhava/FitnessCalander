import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  constructor() { }

  weight: number;
  height: number;
  age: number;
  gender: boolean;
  BMR: number;

  //Male and Female
  //Male = true
  //female = false
  public calculateBMR(heightL, weightL, ageL, genderL) {
    this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL);
    if (genderL === false) {
    }

  }
  ngOnInit() {
  }

}
