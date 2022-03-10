import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import {
  Name,
  Product,
  TypeImg,ProductDataTrnsferObject,
  ProductUpdateDTO
} from '../../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  total: number = 0;
  @Input() productList:Product[] = [];
  @Output() LoadMoreProductsEmit = new EventEmitter();

  @Input() set productId(id: string | null){
    if (id) {
      this.getProductDetail(id);
    }
  }
  showProductDetail:boolean = false;

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

  ngOnInit(): void {}

  addToShoppingCart(product:Product){
   this.storeService.addProduct(product)
   this.total = this.storeService.myShoppingCart
    .reduce((valueInit, itemArray)=>valueInit + itemArray.price, 0);
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  
  getProductDetail(id:number | string){
    this.statusDetail = 'loading';
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id)
      .subscribe({
        next:((data)=>{
          this.productChosen = data;
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
    .subscribe();
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe()
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
      .subscribe()
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

  loadMoreProductsEmit(){
    this.LoadMoreProductsEmit.emit()
  }
  
}
