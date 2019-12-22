import { MaterialModule } from './module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalanderAPIComponent } from './calander-api/calander-api.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './login/login.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTimelineModule } from 'ngx-timeline';
import { SignupComponent } from './signup/signup.component';
import {FlexLayoutModule} from '@angular/flex-layout';

//php -S 127.0.0.1:8080 -t .\backend\
//hi

@NgModule({
  declarations: [
    AppComponent,
    CalanderAPIComponent,
    LoginComponent,
    InfoPageComponent,
    SignupComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxTimelineModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
