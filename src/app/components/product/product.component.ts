import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: "",
    title: "",
    price: 0,
    image: "",
    category: "",
    description: "",
  };

  @Output() addedProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {}

  addToCart(){
    this.addedProduct.emit(this.product);
  }

}
