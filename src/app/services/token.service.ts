import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  saveToken(token:string){
    window.localStorage.setItem('token', token);
  }
  getToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }
}
