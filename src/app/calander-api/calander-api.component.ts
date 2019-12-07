import { totalCalories } from './../models/totalCalories';
import { Weight } from './../models/weight';
import { Food } from './../models/food';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-calander-api',
  templateUrl: './calander-api.component.html',
  styleUrls: ['./calander-api.component.scss']
})
export class CalanderAPIComponent implements OnInit {

  calander: CalanderAPIComponent;
  calendarPlugins = [dayGridPlugin];
  userId: number;
  birthday: Date;
  newBirthday: number;
  kIndex = 0;
  jIndex = 0;
  firstIndex = 0;
  secIndex = 0;

  weight: number;
  height: number;
  age: number;
  gender: string;
  BMR: number;

  viewWeight: number;
  viewHeight: number;
  viewTwoPounds: number;
  viewOnePounds: number;
  viewMaintain: number;

  newSubWeight = [];
  arrCWH = [];
  arrCWHC = [];
  events = [];

  foodForm: FormGroup;
  foodTable: Food[];
  newFood: Food[];
  selectedFood: Food  = { foodId : null , foodName: null, food_calories: null, timestamp: null, userId: null};

  weightForm: FormGroup;
  weightTable: Weight[];
  newWeight: Weight[];
  selectedWeight: Weight  = { weightId : null , height: null, weight: null, timestamp: null, user_id: null};

  totalCaloriesTable: totalCalories[];
  newCalroiesArr = [];


  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    ) {

  }

  ngOnInit() {
    this.route.queryParams
    .subscribe( params => {
      console.log(params);
      this.userId = params.useridMain;
      this.gender = params.userGender;
      this.birthday = params.userAge;
      console.log(this.userId);
      console.log(this.gender);
      console.log(this.birthday);

    });

    this.apiService.readFoodTable(this.userId).subscribe((foodTable: Food[]) => {
      console.log('Food Table: ');
      this.foodTable = foodTable;
      console.log(this.foodTable);
      this.newFood = foodTable;
      console.log(this.newFood);
    });

    this.apiService.readCaloriesTable(this.userId).subscribe((calorieTable: totalCalories[]) => {
      console.log('Calorie Table: ');
      this.totalCaloriesTable = calorieTable;
      console.log(this.totalCaloriesTable);
    });

    this.apiService.readWeightTable(this.userId).subscribe((weightTable: Weight[]) => {
      console.log('Weight Table: ');
      this.weightTable = weightTable;
      console.log(this.weightTable);
      this.newWeight = weightTable;
    });

    setTimeout (() => {
      this.newBirthday = this.calculateAge(this.birthday);
      this.makeLegend();
      this.makeDate_Calories_Eaten_Table();
      this.takeOutDashes();
      // this.insertToEvents();
      this.addWeightHeight();
      this.addColor();
   }, 250);

  }

  goToInfoPage() {
    this.router.navigate(['/info-page'], { queryParams: { useridMain: this.userId, userGender: this.gender, userAge: this.birthday } });
  }

  logOut() {
    this.router.navigate(['/login']);
  }


  makeDate_Calories_Eaten_Table() {
    this.newSubWeight.push({date: this.newWeight[0].timestamp,
      weight: Number(this.newWeight[0].weight),
      height: Number(this.newWeight[0].height)});
    for (let i = 1; i < this.newWeight.length; i++) {
      let j = 0;
      if (this.newWeight[i].timestamp === this.newWeight[j].timestamp) {
        this.newSubWeight.pop();
        this.newSubWeight.push({date: this.newWeight[i].timestamp,
          weight: Number(this.newWeight[i].weight),
          height: Number(this.newWeight[i].height)});
        j += 1;
        }
      else {
        this.newSubWeight.push({date: this.newWeight[i].timestamp,
          weight: Number(this.newWeight[i].weight),
          height: Number(this.newWeight[i].height)});
        j += 1;
      }
    }

    let newSubWeightIndex = 0;
    for (let i = 1; i < this.newSubWeight.length; i++) {
      if (this.newSubWeight[i].date === this.newSubWeight[newSubWeightIndex].date){
        this.newSubWeight.splice(newSubWeightIndex, 1);
        newSubWeightIndex += 1;
      }
      else {
        newSubWeightIndex += 1;
      }
    }
    console.log('NEW WEIGHT ARRAY');
    console.log(this.newSubWeight);

    for (let calorie of this.totalCaloriesTable){
      this.newCalroiesArr.push({date: (calorie.timestamp), calories: Number(calorie.sum)});
    }

    console.log("New Calorie Table:");
    console.log(this.newCalroiesArr);
    }

    changeStringDashestoNoDashes(input: string) {
      var new_string = input.replace(/-|\s/g,"");
      return new_string;
    }

    takeOutDashes() {
      for (let indexCopy = 0; indexCopy < this.newSubWeight.length; indexCopy++) {
        let xCopy = this.newSubWeight[indexCopy].date;
        this.newSubWeight[indexCopy].date = this.changeStringDashestoNoDashes(xCopy);
      }

      for (let indexCopy2 = 0; indexCopy2 < this.newCalroiesArr.length; indexCopy2++) {
        let xCopy2 = this.newCalroiesArr[indexCopy2].date;
        this.newCalroiesArr[indexCopy2].date = this.changeStringDashestoNoDashes(xCopy2);
      }
      console.log(this.newCalroiesArr);


    }

    public addWeightHeight() {
      for (let food of this.newCalroiesArr) {
        for (let weightIndex = 0; weightIndex < this.newSubWeight.length; weightIndex++) {
          if (food.date < this.newSubWeight[weightIndex].date) {
            this.arrCWH.push({date: food.date, calories: food.calories, weight: 0,
              height: 0});
              break;
          }
          if (this.newSubWeight[weightIndex+1] === undefined) {
            this.arrCWH.push({date: food.date, calories: food.calories, weight: this.newSubWeight[weightIndex].weight,
            height: this.newSubWeight[weightIndex].height});
            break;
          }
          if (food.date >= this.newSubWeight[weightIndex].date && food.date < this.newSubWeight[weightIndex + 1].date) {
            this.arrCWH.push({date: food.date, calories: food.calories, weight: this.newSubWeight[weightIndex].weight,
              height: this.newSubWeight[weightIndex].height});
              break;
          }
        }
      }
      console.log(this.arrCWH);
    }

    public addColor() {
      for (let BMI of this.arrCWH) {
        let height = BMI.height;
        let weight = BMI.weight;
        let BMR = this.calculateBMR(height, weight, this.newBirthday, this.gender);
        console.log(this.gender);
        console.log(BMR);
        let green = this.twoPoundPerWeek(BMR);
        let lightGreen = this.onePoundPerWeek(BMR);
        let yellow = this.maintainPoundPerWeek(BMR);
        if (BMI.calories <= green) {
          this.events.push({date: this.makeDateAgain(BMI.date), rendering: 'background',
          backgroundColor: '##00FF00'});
          console.log(this.events);
        }
        if ( lightGreen >= BMI.calories && BMI.calories > green) {
          this.events.push({date: this.makeDateAgain(BMI.date), rendering: 'background',
          backgroundColor: '#90ee90'});
          console.log(this.events);
        }
        if (yellow >= BMI.calories && BMI.calories > lightGreen) {
          this.events.push({date: this.makeDateAgain(BMI.date), rendering: 'background',
          backgroundColor: '#FFFF00'});
          console.log(this.events);
        }
        if (yellow < BMI.calories) {
          this.events.push({date: this.makeDateAgain(BMI.date), rendering: 'background',
          backgroundColor: '#ffcccb'});
          console.log(this.events);
        }
      }
      console.log(this.events);
    }

    public makeLegend() {
      this.viewHeight = this.weightTable[this.weightTable.length - 1].height;
      this.viewWeight = this.weightTable[this.weightTable.length - 1].weight;
      const BMR = this.calculateBMR(this.viewHeight, this.viewWeight, this.newBirthday, this.gender);
      this.viewTwoPounds = Math.round(this.twoPoundPerWeek(BMR));
      this.viewOnePounds = Math.round(this.onePoundPerWeek(BMR));
      this.viewMaintain = Math.round(this.maintainPoundPerWeek(BMR));
    }

    public makeDateAgain(date: string) {
      let result = [date[0]];
      for (let x = 1; x < date.length; x++) {
        if (x === 4 || x === 6) {
          result.push('-',date[x]);
        }
        else {
          result.push(date[x]);
        }
      }
      return result.join('');
    }

    public calculateAge(birthday: Date) {
      let newBirthday = new Date(birthday);
      var ageDifMs = Date.now() - newBirthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    //Male and Female
    //Male = true
    //female = false
    public calculateBMR(heightL: number, weightL: number, ageL: number, genderL: string) {
      if (genderL === 'M') {
        this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL);
      }
      if (genderL === 'F') {
        this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL) - 161;
      }
      return this.BMR;
    }

    public onePoundPerWeek(bmr: number) {
      return (bmr * (1.46)) - 500;
    }

    public twoPoundPerWeek(bmr: number) {
      return (bmr * (1.46)) - 1000;
    }

    public maintainPoundPerWeek(bmr: number) {
      return (bmr * (1.46));
    }

    public makeNewWeightTable() {

    }
  }






