import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  infoForm: FormGroup;
  route: Router;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  weight: number;
  height: number;
  age: number;
  gender: boolean;
  BMR: number;

  //Male and Female
  //Male = true
  //female = false
  public calculateBMR(heightL: number, weightL: number, ageL: number, genderL: boolean) {
    this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL) + 5;
    if (genderL === false) {
      this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL) - 161;
    }
    return this.BMR;
  }

  public onePoundPerWeek(bmr: number) {
    return (bmr * (1.464857651246)) - 500;
  }



  buildForm() {
    this.infoForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      age: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      gender: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      height: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      weight: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }
  //lol

  onSubmit(){
    this.route.navigateByUrl('/calander');
    console.log(this.infoForm.value);
  }

  ngOnInit() {
    this.buildForm();
  }

}
