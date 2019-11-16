import { Weight } from './../models/weight';
import { Food } from './../models/food';
import { Username } from './../models/username';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../models/policy';
import { Observable } from 'rxjs';
import { Calorie } from './../models/calorie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient: HttpClient) { }

  readPolicies(): Observable<Policy[]> {
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  readUserTable(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read_user.php`);
  }

  readFoodTable(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(`${this.PHP_API_SERVER}/api/read_food.php`);
  }

  readWeightTable(): Observable<Weight[]> {
    return this.httpClient.get<Weight[]>(`${this.PHP_API_SERVER}/api/read_weight.php`);
  }

  readCalorieTable(): Observable<Calorie[]> {
    return this.httpClient.get<Calorie[]>(`${this.PHP_API_SERVER}/api/read_calorie.php`);
  }

  readUsername(id: number): Observable<Username[]> {
    return this.httpClient.get<Username[]>(`${this.PHP_API_SERVER}/api/read_username.php/?id=${id}`);
  }

  createPolicy(policy: Policy): Observable<Policy> {
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy);
  }

  createUserTable(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/create_user.php`, user);
  }

  createFoodTable(food: Food, id: number): Observable<Food> {
    console.log(food);
    return this.httpClient.post<Food>(`${this.PHP_API_SERVER}/api/create_food.php/?id=${id}`, food);
  }

  updatePolicy(policy: Policy) {
    return this.httpClient.put<Policy>(`${this.PHP_API_SERVER}/api/update.php`, policy);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/api/update_user.php`, user);
  }

  deletePolicy(id: number){
    return this.httpClient.delete<Policy>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

  deleteUser(id: number){
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/delete_user.php/?id=${id}`);
  }
}
