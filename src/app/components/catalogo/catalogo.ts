import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { ProductCard } from '../product-card/product-card';
import { SharingData } from '../../services/sharing-data';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'catalogo',
  imports: [ProductCard],
  templateUrl: './catalogo.html',
})
export class Catalogo implements OnInit {

  productos: ProductModel[] = [];

  constructor(private SharingData: SharingData,
    private productService: ProductService){}

  ngOnInit(): void {
    this.productos = this.productService.findAll();
  }

  addProduct(producto: ProductModel){
    this.SharingData.addItemEventEmitter.emit(producto);
  }


}
