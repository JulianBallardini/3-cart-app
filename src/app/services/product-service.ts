import { Injectable } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll(): ProductModel[]{
    return products;
  }
}
