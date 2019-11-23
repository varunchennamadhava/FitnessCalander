import { Weight } from './../models/weight';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userId: number;
  newdate: string;

  userForm: FormGroup;
  userTable: User[];
  selectedUser: User  = { user_id : null , username: null, birthday:  null, gender: null};

  weightForm: FormGroup;
  weightTable: Weight[];
  selectedWeight: Weight  = { weightId : null , height: null, weight: null, timeStamp: null, user_id: null};

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getUTCFullYear();

    this.newdate = year + "-" + month + "-" + day;

    this.weightForm.patchValue({
      timestamp: this.newdate
    });
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      id: [null, Validators.required],
      username: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null, Validators.required],
    });

    this.weightForm = this.formBuilder.group({
      id: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      timestamp: [null, Validators.required],
      user_id: [null, Validators.required],
    });
  }

    createorUpdateUser(form, weightForm){
      this.apiService.createUserTable(form.value).subscribe((userTable: User) => {
        console.log("User created, ", userTable);
        console.log(userTable.user_id);
        this.userId = userTable.user_id;

        this.createWeight(weightForm);

      });
    }


  createWeight(form) {
    console.log(form.value);
    this.apiService.createWeightTable(form.value, this.userId).subscribe((weightTable: Weight) => {
      console.log("Weight created, ", weightTable);
    });
  }



  goToLoginPage() {
    this.router.navigate(['/login']);
  }

}
