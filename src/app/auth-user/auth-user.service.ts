import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  createAndStoreUser(email: string, password: string) {
    //send http request
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlkxU1phROSxK9rSMgka2skwT2SqkPdds',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handelAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn )
        })
      );
  }

  loginUser<AuthResponseData>(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlkxU1phROSxK9rSMgka2skwT2SqkPdds',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  private handelAuthentication(email: string, userId: string ,token: string, expiresIn: number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }






  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Exists Already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email Does Not Exists ';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = ' Password Was Not Correct';
    }
    return throwError(errorMessage);
  }
}
