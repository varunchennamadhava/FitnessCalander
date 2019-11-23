import { Food } from './../models/food';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-calander-api',
  templateUrl: './calander-api.component.html',
  styleUrls: ['./calander-api.component.scss']
})
export class CalanderAPIComponent implements OnInit {

  calander: CalanderAPIComponent;
  calendarPlugins = [dayGridPlugin];
  userId: number;

  foodForm: FormGroup;
  foodTable: Food[];
  newFood: Food[];
  selectedFood: Food  = { foodId : null , foodName: null, food_calories: null, timestamp: null, userId: null};


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

    setTimeout (() => {
      this.makeDate_Calories_Eaten_Table();
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

    this.newArray.push({date: this.newFood[0].timestamp, calories: this.newFood[0].food_calories});
    console.log(this.newArray);

    for(let i = 1; i < this.newFood.length; i++) {
      let j = 1;
      let dateString = this.newFood[i].timestamp;
      if(dateString === this.newFood[i-1].timestamp) {
        this.newArray[j].calories += this.newFood[i].food_calories;
        }
      else {
        this.newArray.push({date: this.newFood[i].timestamp, calories: this.newFood[i].food_calories});
        j++;
      }
      }

      console.log("End of Function  :");
      console.log(this.newArray);
    }
  }






