import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

import { Name, Product, TypeImg, ProductDataTrnsferObject, ProductUpdateDTO } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  total: number = 0;
  productList:Product[] = [];
  showProductDetail:boolean = false;
  limit:number = 10;
  offset:number = 0;
  statusDetail: 'loading' | 'succes' | 'error' | 'init' = 'init';

  productChosen:Product = {
    id: 0,
    title: "",
    price: 0,
    images: ["https://placeimg.com/640/480/animals?r=0.43877381458814413"],
    category: {
      id: 0,
      name: Name.Clothes,
      typeImg: TypeImg.People
    },
    description: "",
  }
  constructor(
    private storeService:StoreService,
    private productsService: ProductsService
    ) {
    this.productList = this.storeService.getTotalShoppingCart();
  }

  ngOnInit(): void {
    this.loadMoreProducts();
  }

  addToShoppingCart(product:Product){
   this.storeService.addProduct(product)
   this.total = this.storeService.myShoppingCart
    .reduce((valueInit, itemArray)=>valueInit + itemArray.price, 0);
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  
  getProductDetail(id:number){
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    // .subscribe((data)=>{
    //     this.toggleProductDetail();
    //     this.productChosen = data;
    //     this.statusDetail = 'succes';
    //   })
    .subscribe({
      next:((data)=>{
        this.productChosen = data;
        this.toggleProductDetail();
      }),
      error: (err)=>{window.alert(err)},
      complete: ()=>{console.log('Done!')}
    })    
  }
  readAndUpdate(id: number) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'})),
    )
    .subscribe(data => {
      console.log(data);
    });
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
      console.log(read);
      console.log(update);
    })
  }
  createNewProduct(){
    const newProduct:ProductDataTrnsferObject = {
      title: "New Product",
      price: 2000,
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      categoryId: 10,
      description: "Este en un nuevo producto para guardar",
    }
    this.productsService.createProduct(newProduct)
          .subscribe((res)=>{
            console.log(res);
            // this.productList.push(res);
          })
  }

  updateProduct(){
    const changes:ProductUpdateDTO = {
      title: 'New title the edit product',
      price: 1500
    }
    this.productsService.update(this.productChosen.id, changes)
      .subscribe((res)=>{
        this.productChosen = res;
        const productIndex = this.productList.findIndex(item=>item.id === this.productChosen.id);
        this.productList[productIndex] = res;
      })
  }

  deleteProduct(){
    this.productsService.delete(this.productChosen.id)
      .subscribe(()=>{
        const productIndex = this.productList.findIndex(item=>item.id === this.productChosen.id);
        this.productList.splice(productIndex, 1);
        this.showProductDetail = false;
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
