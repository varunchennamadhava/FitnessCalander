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
  newStringDate: string;

  foodForm: FormGroup;
  foodTable: Food[];
  newFood: Food[];
  selectedFood: Food  = { foodId : null , foodName: null, food_calories: null, timestamp: null, userId: null};

  weightForm: FormGroup;
  weightTable: Weight[];
  selectedWeight: Weight  = { weightId : null , height: null, weight: null, timeStamp: null, user_id: null};


  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    ) {


  }


  ngOnInit() {
    this.route.queryParams
    .subscribe( params => {
      console.log(params);
      this.userId = params.useridMain;
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
    });

    setTimeout (() => {
      this.makeDate_Calories_Eaten_Table();
      this.takeOutDashes();
   }, 1000);



  }





  goToInfoPage() {
    this.router.navigate(['/info-page'], { queryParams: { useridMain: this.userId } });
  }

  logOut() {
    this.router.navigate(['/login']);
  }


  newArray = [];

  makeDate_Calories_Eaten_Table() {
    console.log('Hello');
    console.log(this.newFood[0].timestamp);

    this.newArray.push({date: this.newFood[0].timestamp, calories: parseInt(this.newFood[0].food_calories)});
    console.log(this.newArray);

    for(let i = 1; i < this.newFood.length; i++) {
      let j = 1;
      let dateString = this.newFood[i].timestamp;
      if(dateString === this.newFood[i-1].timestamp) {
        this.newArray[j].calories += parseInt(this.newFood[i].food_calories);
        }
      else {
        this.newArray.push({date: this.newFood[i].timestamp, calories: parseInt(this.newFood[i].food_calories)});
        j++;
      }
      }
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
      for(let index = 0; index < this.newArray.length; index++) {
        let x = this.newArray[index].date;
        this.newArray[index].date = this.changeStringDashestoNoDashes(x);
      }
      for(let indexCopy = 0; indexCopy < this.weightTable.length; indexCopy++) {
        let xCopy = this.weightTable[indexCopy].timeStamp;
        var month = xCopy.getUTCMonth() + 1;
        var day = xCopy.getDate();
        var year = xCopy.getUTCFullYear();

        this.newStringDate = year + "-" + month +  "-" + day;
        this.weightTable[indexCopy].timeStamp = this.changeStringDashestoNoDashes(this.newStringDate);
      }
      console.log(this.newArray);
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
      this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL);
      if (genderL === false) {
        this.BMR = (10 * weightL) + (6.25 * heightL) - (5 * ageL) - 161;
      }
      return this.BMR;
    }

    public twoPoundPerWeek(bmr: number) {
      return (bmr * (1.46)) - 1000;
    }

    public onePoundPerWeek(bmr: number) {
      return (bmr * (1.46)) - 500;
    }

    public maintainPoundPerWeek(bmr: number) {
      return (bmr * (1.46));
    }










  }






