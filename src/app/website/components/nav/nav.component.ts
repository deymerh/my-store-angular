import { Component, OnInit } from '@angular/core';

import { StoreService } from '.././../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { CreateUserDTO } from '../../../models/user.model';
import { CategoriesService } from '../../../services/categories.service';

import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeMenu:boolean = false;
  counter:number = 0;
  user:CreateUserDTO | null = null;
  categories:Category[] = [];

  constructor(
    private storeService:StoreService,
    private authService:AuthService,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products)=>{
      this.counter = products.length;
    });
    this.authService.user$.subscribe((user)=>{
      this.user = user;
    })
    this.getAllCategories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(email:string = 'deymerh@deymerh.com', password:string = 'deymerh'){
    this.authService.loginAndGetProfile(email, password)
    .subscribe(()=>this.router.navigate(['/profile']));
  }

  logout(){
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/home']);
  }

  getAllCategories(){
    this.categoriesService.getAll()
      .subscribe(res=>{
        this.categories = res;
      })
  }

  createUser(){
    this.usersService.create({
      name: 'Deymer - Admin',
      email: 'deymerh@deymerh.com',
      password: 'deymerh',
      role: 'customer'
    }).subscribe()
  }
}
