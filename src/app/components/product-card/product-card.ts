import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../models/productModel';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {

  @Input() product!: ProductModel;
  @Output() addProductEventEmitter: EventEmitter <ProductModel> = new EventEmitter();

  onAddCart(producto: ProductModel){
    this.addProductEventEmitter.emit(producto);
  }

}
