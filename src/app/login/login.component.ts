import { Username } from './../models/username';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: Router) {
  }
  usernameMain: string;
  loginForm: FormGroup;


  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      user_name: [''],
      user_id: ['']
    });
  }


  submitLoginForm() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.controls['user_name'].value);
    this.usernameMain = this.loginForm.controls['user_name'].value;
    console.log('usernameMain is:  ' + this.usernameMain);
    //this.route.navigateByUrl('/calander');
    this.route.navigate(['/calander'], { queryParams: { useridMain: this.usernameMain } });

  }
}
