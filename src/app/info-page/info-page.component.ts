import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
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
  public calculateBMR(heightL: number, weightL: number, ageL: number, genderL: boolean) {
    this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL);
    if (genderL === false) {
      this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL) - 161;
    }
    return this.BMR;
  }

  public onePoundPerWeek(bmr: number) {
    return (bmr * (1.46)) - 500;
  }
  ngOnInit() {
  }

}
