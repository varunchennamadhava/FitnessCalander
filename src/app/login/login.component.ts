import { ApiService } from './../services/api.service';
import { Username } from './../models/username';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { User } from './../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: Router, private apiService: ApiService) {
  }
  usernameMain: string;
  userId: number;
  loginForm: FormGroup;

  userForm: FormGroup;
  userTable: User[];
  selectedUser: User  = { user_id : null , username: null, birthday:  null, gender: null};

  ngOnInit() {
    this.buildForm();
    this.apiService.readUserTable().subscribe((userTable: User[]) => {
      console.log('User Table: ');
      this.userTable = userTable;
      console.log(this.userTable);
    });
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      userId: ['']
    });
  }

  submitLoginForm() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.controls['userName'].value);
    this.usernameMain = this.loginForm.controls['userName'].value;
    for (let user of this.userTable) {
      console.log(user);
      console.log(user.user_id);
      if (this.usernameMain === user.username) {
        this.userId = user.user_id;
        console.log('usernameMain is:  ' + this.userId);
        this.route.navigate(['/calander'], { queryParams: { useridMain: this.userId } });
      }
    }
  }

  goToSignUp() {
    this.route.navigate(['/signup']);
  }

}
