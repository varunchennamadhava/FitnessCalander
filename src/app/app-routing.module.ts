import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { CalanderAPIComponent } from './calander-api/calander-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'calander', component: CalanderAPIComponent, },
  { path: 'info-page', component: InfoPageComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
