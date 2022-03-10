import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categoryId: string | null = null;
  limit:number = 10;
  offset:number = 0;
  productListByCategory:Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params)=>{
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return [];
        })
      )
      .subscribe((res)=>{
        this.productListByCategory = res;
      })
  }
}