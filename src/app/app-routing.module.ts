import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { DisplayComponent } from './display/display.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  // { path: '**', redirectTo: ''},
  { path: 'display', component: DisplayComponent },
  {path:'auth', component: AuthUserComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
