import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalanderAPIComponent } from './calander-api/calander-api.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './login/login.component';
import { InfoPageComponent } from './info-page/info-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CalanderAPIComponent,
    LoginComponent,
    InfoPageComponent
  ],
  //hi
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
