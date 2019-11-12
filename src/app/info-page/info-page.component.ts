import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Policy } from '../policy';
@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  infoForm: FormGroup;
  policyForm: FormGroup;
  policies:  Policy[];
  selectedPolicy:  Policy  = { id :  null , number:null, amount:  null};


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
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
  }

  onSubmit(){
    console.log(this.infoForm.value);
  }

  ngOnInit() {
    this.buildForm();
    this.apiService.readPolicies().subscribe((policies: Policy[])=>{
      this.policies = policies;
      console.log(this.policies);
    });
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

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
  }

  deletePolicy(id){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
      console.log("Policy deleted, ", policy);
    });
  }

}
