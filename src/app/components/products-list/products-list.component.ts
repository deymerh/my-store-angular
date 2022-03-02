import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  total: number = 0;
  productList:Product[] = [];
  today = new Date(2022, 2, 28);
  date = new Date(2021, 12, 27);

  constructor(
    private storeService:StoreService,
    private productsService: ProductsService
    ) {
    this.productList = this.storeService.getTotalShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res)=>this.productList = res)
  }

  addToShoppingCart(product:Product){
   this.storeService.addProduct(product)
   this.total = this.storeService.myShoppingCart.reduce((valueInit, itemArray)=>valueInit + itemArray.price, 0);
  }

}
