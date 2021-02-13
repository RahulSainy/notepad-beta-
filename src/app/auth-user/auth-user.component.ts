import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService, AuthResponseData } from './auth-user.service';
import { Post } from './post.model';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css'],
})
export class AuthUserComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  loginForm = new FormGroup({});
  public isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs : any;

  constructor(
    private http: HttpClient,
    private authUserService: AuthUserService,
    private router: Router,
  ) {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }


 onSwitchMode(){
    this.isLoginMode= !this.isLoginMode;
  }
  

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  onCreatePost(postData: Post) {
    //send http request


    this.isLoading = true;
    if (this.isLoginMode){
    this.authObs = this.authUserService.loginUser(postData.email, postData.password);
 
   }

   else{
     this.authObs = this.authUserService.createAndStoreUser(postData.email, postData.password)
   }
   

   this.authObs.subscribe(responseData=>{

    console.log(responseData);
    this.isLoading = false;
    this.router.navigate(['/']);

  },errorMessage => {
    this.error = errorMessage
    console.log(errorMessage);
    
    this.isLoading = false;

  });


   this.loginForm.reset();
   
  
  }

  
}
