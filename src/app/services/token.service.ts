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
    return window.localStorage.getItem('token');
  }
  removeToken(){
    window.localStorage.removeItem('token');
  }
}
