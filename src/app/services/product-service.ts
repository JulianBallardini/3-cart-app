import { Injectable } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { products } from '../data/product.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll(): Observable <ProductModel[]>{
    return of(products);
  }
}
