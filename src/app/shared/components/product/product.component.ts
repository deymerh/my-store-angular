import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Name, Product, TypeImg } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: 0,
    title: "",
    price: 0,
    images: [],
    category: {
      id: 0,
      name: Name.Clothes,
      typeImg: TypeImg.People
    },
    description: "",
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output()  showProductDetail = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {}

  addToCart(){
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProductDetail.emit(this.product.id);
  }

}
