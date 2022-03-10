import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productId: string | null = null;
  limit:number = 10;
  offset:number = 0;
  productList:Product[] = [];

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadMoreProducts();

    this.activatedRoute.queryParamMap.subscribe(params=>{
      this.productId = params.get('product');
    })
  }

  loadMoreProducts(){
    this.productsService.getAllProducts(this.limit, this.offset)
      .subscribe((res)=>{
        this.productList = this.productList.concat(res);
        this.offset += this.limit;
      })
  }

}
