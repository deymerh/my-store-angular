import { Injectable } from '@angular/core';
import { 
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Product, ProductDataTrnsferObject, ProductUpdateDTO } from '../models/product.model';
import { catchError, throwError, zip } from 'rxjs';

import { retry, map } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL:string = `${environment.API_URL}`;
  // private apiURL:string = 'https://young-sands-07814.herokuapp.com/api';
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  // getProductsPagination(limit:number, offset:number){
  //   return this.httpClient.get<Product[]>(`${this.apiURL}/products`, {
  //     params: {limit, offset}
  //   })
  // }

  getByCategory(categoryId:string, limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient.get<Product[]>(`${this.apiURL}/api/categories/${categoryId}/products`)
  }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient.get<Product[]>(`${this.apiURL}/api/products`, {params, context: checkTime()})
      .pipe(
        retry(2),
        map(prodcuts=>prodcuts.map(item=>{
          return { ...item, taxes: .19 * item.price}
        }))
      )
  }

  fetchReadAndUpdate(id: number, dto: ProductUpdateDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }


  getProduct(id:number | string){
    return this.httpClient.get<Product>(`${this.apiURL}/api/products/${id}`)
      .pipe(
        catchError((error:HttpErrorResponse)=>{
          if (error.status === 500) {
            return throwError(()=>'Ups, hubo un error en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(()=>'Producto no encontrado!');
          }
          return throwError(()=>'Ups, algo salió mal');
        }))
  }

  createProduct(data:ProductDataTrnsferObject){
    return this.httpClient.post<Product>(`${this.apiURL}/api/products`, data);
  }

  update(id:number, data:ProductUpdateDTO){
    return this.httpClient.put<Product>(`${this.apiURL}/api/products/${id}`, data);
  }

  delete(id:number){
    return this.httpClient.delete<boolean>(`${this.apiURL}/api/products/${id}`);
  }
}
