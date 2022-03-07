import { Injectable } from '@angular/core';
import { 
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpStatusCode } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { environment } from './../../environments/environment';
import { Auth } from '../models/auth.model';
import { User, CreateUserDTO } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL:string = `${environment.API_URL}`;
  
  private user = new BehaviorSubject<CreateUserDTO>({
    email: '',
    name: '',
    password: ''
  });

  user$ = this.user.asObservable();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ){}

  login(email: string, password: string){
    return this.httpClient.post<Auth>(`${this.apiURL}/api/auth/login`, {email, password})
      .pipe(
        tap(({access_token})=>this.tokenService.saveToken(access_token))
      )
  }

  getProfile(){
    // const headers = new HttpHeaders();
    // headers.set('Autorization', `Bearer ${token}`);
    return this.httpClient.get<User>(`${this.apiURL}/api/auth/profile`, {
      // El token lo agregamos a travez de un interceptor
    })
  }

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
      switchMap(async (res) => this.user.next(res)))
    }

}