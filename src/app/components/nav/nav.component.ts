import { Component, OnInit } from '@angular/core';

import { StoreService } from './../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { CreateUserDTO } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeMenu:boolean = false;
  counter:number = 0;
  user:CreateUserDTO = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private storeService:StoreService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    
    this.storeService.myCart$.subscribe((products)=>{
      this.counter = products.length;
    });

    this.authService.user$.subscribe((user)=>{
      this.user = user;
    })

  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

}
