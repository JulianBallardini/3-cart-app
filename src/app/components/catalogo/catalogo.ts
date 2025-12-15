import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { ProductCard } from '../product-card/product-card';
import { SharingData } from '../../services/sharing-data';
import { ProductService } from '../../services/product-service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalogo',
  imports: [ProductCard],
  templateUrl: './catalogo.html',
})
export class Catalogo implements OnInit{

  private store = inject(Store);
  productos = this.store.selectSignal((state) => state.productStore.productos);

  constructor(private SharingData: SharingData, private service: ProductService){}
  ngOnInit(): void {
    this.store.dispatch(load());
  }

  addProduct(producto: ProductModel){
    this.SharingData.addItemEventEmitter.emit(producto);
  }


}
