import { InfoPageComponent } from './info-page/info-page.component';
import { CalanderAPIComponent } from './calander-api/calander-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/info-page', pathMatch: 'full' },
  { path: 'calander', component: CalanderAPIComponent, },
  { path: 'info-page', component: InfoPageComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
