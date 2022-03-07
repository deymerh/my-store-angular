import { Injectable } from '@angular/core';
import { 
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL:string = `${environment.API_URL}/api/users`;
  
  constructor(private httpClient: HttpClient){}

  create(dto:CreateUserDTO){
    return this.httpClient.post<User>(this.apiURL, dto);
  }

  getAll(){
    return this.httpClient.get<User[]>(this.apiURL);
  }
}
