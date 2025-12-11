import { ProductModel } from "./productModel";

export class CartItem{
    quantity: number = 0;
    product!: ProductModel;
}