import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutosizeModule } from 'ngx-autosize';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { loadingSpinnerComponent } from './display/shared/loading-spinner.component';
import { AuthUserService } from './auth-user/auth-user.service';


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    AuthUserComponent,
    NavBarComponent,
    DisplayComponent,
    loadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutosizeModule,
    FormsModule,
    CommonModule
  ],
  providers: [AuthUserService, AuthUserComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
