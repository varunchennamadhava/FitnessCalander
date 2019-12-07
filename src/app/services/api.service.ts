import { totalCalories } from './../models/totalCalories';
import { CalanderFood } from './../models/calanderFood';
import { Weight } from './../models/weight';
import { Food } from './../models/food';
import { Username } from './../models/username';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Policy } from '../models/policy';
import { Observable, throwError } from 'rxjs';
import { Calorie } from './../models/calorie';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient: HttpClient) { }

  foods: Food[];
  weights: Weight[];

  private handleError(error: HttpErrorResponse) {
  console.log(error);

  // return an observable with a user friendly message
  return throwError('Error! something went wrong.');
}

  readPolicies(): Observable<Policy[]> {
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  readUserTable(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read_user.php`);
  }

  readFoodTable(id: number): Observable<Food[]> {
    return this.httpClient.get<Food[]>(`${this.PHP_API_SERVER}/api/read_food.php/?id=${id}`);
  }

  readCaloriesTable(id: number): Observable<totalCalories[]> {
    return this.httpClient.get<totalCalories[]>(`${this.PHP_API_SERVER}/api/read_total_food.php/?id=${id}`);
  }

  readWeightTable(id: number): Observable<Weight[]> {
    return this.httpClient.get<Weight[]>(`${this.PHP_API_SERVER}/api/read_weight.php/?id=${id}`);
  }

  readCalorieTable(): Observable<Calorie[]> {
    return this.httpClient.get<Calorie[]>(`${this.PHP_API_SERVER}/api/read_calorie.php`);
  }

  readCalanderTable(id: number): Observable<CalanderFood[]> {
    return this.httpClient.get<CalanderFood[]>(`${this.PHP_API_SERVER}/api/read_calander.php/?id=${id}`);
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

  createWeightTable(weight: Weight, id: number): Observable<Weight> {
    return this.httpClient.post<Weight>(`${this.PHP_API_SERVER}/api/create_weight.php/?id=${id}`, weight);
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

  deleteFood(id: number): Observable<Food[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.httpClient.delete(`${this.PHP_API_SERVER}/api/delete_food.php/`, { params: params })
      .pipe(map(res => {
        const filteredFoods = this.foods.filter((food) => {
          return +food['id'] !== +id;
        });
        return this.foods = filteredFoods;
      }),
      catchError(this.handleError));
}

deleteWeight(id: number): Observable<Weight[]> {
  const params = new HttpParams()
    .set('id', id.toString());

  return this.httpClient.delete(`${this.PHP_API_SERVER}/api/delete_weight.php/`, { params: params })
    .pipe(map(res => {
      const filteredWeights = this.weights.filter((weight) => {
        return +weight['id'] !== +id;
      });
      return this.weights = filteredWeights;
    }),
    catchError(this.handleError));
}
}
