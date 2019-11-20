import { Weight } from './../models/weight';
import { Food } from './../models/food';
import { Username } from './../models/username';
import { User } from './../models/user';
import { ApiService } from '../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Policy } from '../models/policy';
import { MatTableDataSource, MatPaginator, MatSort, } from '@angular/material';
import { Calorie } from './../models/calorie';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  @ViewChild(MatPaginator,  { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,  { static: false }) sort: MatSort;

  infoForm: FormGroup;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['foodName', 'foodCalories', 'timestamp', 'actions'];

  usernameTable: Username[];

  policyForm: FormGroup;
  policies: Policy[];
  selectedPolicy: Policy  = { id :  null , number:null, amount:  null};

  userForm: FormGroup;
  userTable: User[];
  selectedUser: User  = { userId : null , username: null, birthday:  null, gender: null};

  foodForm: FormGroup;
  foodTable: Food[];
  selectedFood: Food  = { foodId : null , foodName: null, foodCalories:  null, timestamp: null, userId: null};

  weightForm: FormGroup;
  weightTable: Weight[];
  selectedWeight: Weight  = { weightId : null , height: null, weight: null, timeStamp: null, userId: null};

  calorieForm: FormGroup;
  calorieTable: Calorie[];
  selecteCalorie: Calorie  = { calorieId : null , extreme: null, mild: null, noLoss: null, userId: null};


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.buildForm();
    this.dataSource = new MatTableDataSource();
  }

  weight: number;
  height: number;
  age: number;
  gender: boolean;
  BMR: number;
  userId: number;
  success: string;
  error: string;

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

  buildForm() {
    this.infoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    });

    this.policyForm = this.formBuilder.group({
      id: [null, Validators.required],
      number: [null, Validators.required],
      amount: [null, Validators.required],
    });

    this.userForm = this.formBuilder.group({
      id: [null, Validators.required],
      username: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null, Validators.required],
    });

    this.foodForm = this.formBuilder.group({
      id: [null, Validators.required],
      foodName: [null, Validators.required],
      foodCalories: [null, Validators.required],
      timestamp: [null, Validators.required],
      userId: [null, Validators.required],
    });

    this.weightForm = this.formBuilder.group({
      id: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      timestamp: [null, Validators.required],
      userId: [null, Validators.required],
    });

    this.calorieForm = this.formBuilder.group({
      id: [null, Validators.required],
      extreme: [null, Validators.required],
      mild: [null, Validators.required],
      noLoss: [null, Validators.required],
      userId: [null, Validators.required],
    });
  }

  onSubmit(){
    console.log(this.infoForm.value);
  }

  ngOnInit() {
    this.buildForm();
    // this.apiService.readPolicies().subscribe((policies: Policy[]) => {
    //   this.policies = policies;
    //   console.log(this.policies);
    // });
    this.apiService.readUserTable().subscribe((userTable: User[]) => {
      console.log('User Table: ');
      this.userTable = userTable;
      console.log(this.userTable);
    });

    this.apiService.readFoodTableById(2).subscribe((foodTable: Food[]) => {
      console.log('Food Table: ');
      this.foodTable = foodTable;
      console.log(this.foodTable);
    });

    this.apiService.readWeightTable().subscribe((weightTable: Weight[]) => {
      console.log('Weight Table: ');
      this.weightTable = weightTable;
      console.log(this.weightTable);
    });

    this.apiService.readCalorieTable().subscribe((calorieTable: Calorie[]) => {
      console.log('Calorie Table: ');
      this.calorieTable = calorieTable;
      console.log(this.calorieTable);
    });

    this.apiService.readUsername(2).subscribe((usernameTable: Username[]) => {
      console.log('Main: ');
      this.usernameTable = usernameTable;
      console.log(this.usernameTable);
    });


    this.userId = 1;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createOrUpdatePolicy(form){
    if(this.policyForm && this.policyForm.value.id){
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy updated" , policy);
      });
    }
    else{

      this.apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy created, ", policy);
      });
    }
  }

  createorUpdateUser(form){
    if(this.userForm && this.userForm.value.id){
      form.value.id = this.selectedUser.userId;
      this.apiService.updateUser(form.value).subscribe((user: User)=>{
        console.log("Policy updated" , user);
      });
    }
    else {
      this.apiService.createUserTable(form.value).subscribe((userTable: User) => {
        console.log("User created, ", userTable);
      });
    }
  }

  createFood(form) {
    console.log(form.value);
    this.apiService.createFoodTable(form.value, this.userId).subscribe((foodTable: Food) => {
      console.log("Food created, ", foodTable);
    });
  }

  createWeight(form) {
    console.log(form.value);
    this.apiService.createWeightTable(form.value, this.userId).subscribe((weightTable: Weight) => {
      console.log("Food created, ", weightTable);
    });
  }

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
  }

  deletePolicy(id){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
      console.log("Policy deleted, ", policy);
    });
  }

  deleteUser(id){
    this.apiService.deleteUser(id).subscribe((user: User)=>{
      console.log("User deleted, ", user);
    });
  }

  deleteFood(id) {
    this.success = '';
    this.error   = '';

    this.apiService.deleteFood(+id)
      .subscribe(
        (res: Food[]) => {
          this.foodTable = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
}

}
