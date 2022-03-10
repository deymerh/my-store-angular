import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '.././../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap
      .pipe(
        switchMap((params)=>{
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProduct(this.productId)
          }
          return [];
        })
      )
      .subscribe((res)=>{
        this.product = res;
      })
  }

  goToBack(){
    this.location.back();
  }

}
