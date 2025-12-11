import { EventEmitter, Injectable } from '@angular/core';
import { CartItem } from '../models/cartItems';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class SharingData {
  
  private _removeItemEventEmitter: EventEmitter<CartItem>= new EventEmitter();

  private productEventEmitter: EventEmitter <ProductModel> = new EventEmitter();

  constructor() { }

  get removeItemEventEmitter(): EventEmitter<CartItem>{
    return this._removeItemEventEmitter;
  }

  get addItemEventEmitter(): EventEmitter<ProductModel>{
    return this.productEventEmitter;
  }

}
