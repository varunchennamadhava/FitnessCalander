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

  userForm: FormGroup;
  userTable: User[];
  selectedUser: User  = { user_id : null , username: null, birthday:  null, gender: null};

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      id: [null, Validators.required],
      username: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null, Validators.required],
    });
  }

    createorUpdateUser(form){
    if(this.userForm && this.userForm.value.id) {
      form.value.id = this.selectedUser.user_id;
      this.apiService.updateUser(form.value).subscribe((user: User) => {
        console.log("Policy updated" , user);
      });
    }
    else {
      this.apiService.createUserTable(form.value).subscribe((userTable: User) => {
        console.log("User created, ", userTable);
      });
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

}
