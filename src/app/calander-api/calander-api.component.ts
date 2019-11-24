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

  newArray = [];
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
    });

    this.apiService.readFoodTable(this.userId).subscribe((foodTable: Food[]) => {
      console.log('Food Table: ');
      this.foodTable = foodTable;
      console.log(this.foodTable);
      this.newFood = foodTable;
      console.log(this.newFood);
    });

    this.apiService.readWeightTable(this.userId).subscribe((weightTable: Weight[]) => {
      console.log('Weight Table: ');
      this.weightTable = weightTable;
      console.log(this.weightTable);
      this.newWeight = weightTable;
    });

    setTimeout (() => {
      this.makeDate_Calories_Eaten_Table();
      this.takeOutDashes();
      console.log(this.newArray);
      this.newBirthday = this.calculateAge(this.birthday);
      // this.insertToEvents();
      this.addWeightHeight();
   }, 1000);
  }

  goToInfoPage() {
    this.router.navigate(['/info-page'], { queryParams: { useridMain: this.userId } });
  }

  logOut() {
    this.router.navigate(['/login']);
  }


  makeDate_Calories_Eaten_Table() {
    console.log('Hello');
    // console.log(this.newFood[0].timestamp);
    // console.log(this.newWeight[0].timestamp);

    console.log(this.newFood);
    this.newArray.push({date: this.newFood[0].timestamp, calories: parseInt(this.newFood[0].food_calories)});
    console.log(this.newArray);

    for(let i = 1; i < this.newFood.length; i++) {
      if (this.newFood[i].timestamp === this.newFood[this.jIndex].timestamp) {
        this.newArray[this.kIndex].calories += parseInt(this.newFood[i].food_calories);
        }
      else {
        this.jIndex = i;
        this.kIndex ++;
        this.newArray.push({date: this.newFood[i].timestamp, calories: parseInt(this.newFood[i].food_calories)});
      }
    }

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

    for (let i = 1; i < this.newSubWeight.length; i++) {
      let j = 0;
      if (this.newSubWeight[i].timestamp === this.newSubWeight[j].timestamp){
        this.newSubWeight.splice(j, 1);
        j += 1;
      }
    }
    console.log('NEW WEIGHT ARRAY');
    console.log(this.newSubWeight);


    console.log("End of Function  :");
    console.log(this.newArray);
    }

    changeStringDashestoNoDashes(input: string) {
      // for(let h = 0; h < input.length; h++)
      // {
      //   if(input[h] === "-") {

      //   }
      // }

      var new_string = input.replace(/-|\s/g,"");
      return new_string;
    }

    takeOutDashes() {
      for (let index = 0; index < this.newArray.length; index++) {
        let x = this.newArray[index].date;
        this.newArray[index].date = this.changeStringDashestoNoDashes(x);
      }
      for (let indexCopy = 0; indexCopy < this.newSubWeight.length; indexCopy++) {
        let xCopy = this.newSubWeight[indexCopy].date;
        this.newSubWeight[indexCopy].date = this.changeStringDashestoNoDashes(xCopy);
      }
      console.log(this.newArray[0]);


    }

    public addWeightHeight() {
      for (let food of this.newArray) {
        console.log(food.date);
        console.log(this.newSubWeight[0].date);
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
          if (food.date > this.newSubWeight[weightIndex].date && food.date < this.newSubWeight[weightIndex + 1].date) {
            this.arrCWH.push({date: food.date, calories: food.calories, weight: this.newSubWeight[weightIndex].weight,
              height: this.newSubWeight[weightIndex].height});
              break;
          }
        }
      }
      console.log(this.arrCWH);
    }

    // public insertToEvents() {
    //   for (let i = 0; i < this.newArray.length; i++) {
    //     for (let j = 0; j < this.newSubWeight.length; j++) {
    //     if (this.newArray[i].date >= this.newSubWeight[this.firstIndex].date && this.newArray[i].date < this.newSubWeight[this.secIndex].date) {
    //       let height = this.newSubWeight[this.firstIndex].height;
    //       let weight = this.newSubWeight[this.firstIndex].weight;
    //       let BMR = this.calculateBMR(height, weight, this.newBirthday, this.gender);
    //       let green = this.twoPoundPerWeek(BMR);
    //       let lightGreen = this.onePoundPerWeek(BMR);
    //       let yellow = this.maintainPoundPerWeek(BMR);

    //       if (this.newArray[i].calories >= green) {
    //         this.events.push({date: this.makeDateAgain(this.newSubWeight[this.firstIndex].date), rendering: 'background',
    //         backgroundColor: '##00FF00'});
    //       }
    //       if ( lightGreen <= this.newArray[i].calories && this.newArray[i].calorie < green) {
    //         this.events.push({date: this.makeDateAgain(this.newSubWeight[this.firstIndex].date), rendering: 'background',
    //         backgroundColor: '#90ee90'});
    //       }
    //       if (yellow <= this.newArray[i].calories) {
    //         this.events.push({date: this.makeDateAgain(this.newSubWeight[this.firstIndex].date), rendering: 'background',
    //         backgroundColor: '#FFFF00'});
    //       }
    //     }
    //     if (this.newArray[i].date < this.newSubWeight[this.firstIndex].date){
    //       this.firstIndex ++;
    //       this.secIndex ++;
    //       continue;
    //     }
    //     if (this.newArray[i].date >= this.newSubWeight[this.secIndex].date){

    //       let height = this.newSubWeight[this.secIndex].height;
    //       let weight = this.newSubWeight[this.secIndex].weight;
    //       let BMR = this.calculateBMR(height, weight, this.newBirthday, this.gender);
    //       let green = this.twoPoundPerWeek(BMR);
    //       let lightGreen = this.onePoundPerWeek(BMR);
    //       let yellow = this.maintainPoundPerWeek(BMR);

    //       if (this.newArray[i].calories >= green) {
    //         this.events.push({date: this.makeDateAgain(this.newSubWeight[this.secIndex].date), rendering: 'background',
    //         backgroundColor: '##00FF00'});
    //       }
    //       if ( lightGreen <= this.newArray[i].calories && this.newArray[i].calorie < green) {
    //         this.events.push({date: this.makeDateAgain(this.newSubWeight[this.secIndex].date), rendering: 'background',
    //         backgroundColor: '#90ee90'});
    //       }
    //       if (yellow <= this.newArray[i].calories) {
    //         this.events.push({date: this.makeDateAgain(this.newSubWeight[this.secIndex].date), rendering: 'background',
    //         backgroundColor: '#FFFF00'});
    //       }
    //     }
    //     this.firstIndex ++;
    //     this.secIndex ++;
    //   }
    //   }
    //   console.log(this.events);
    // }

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






