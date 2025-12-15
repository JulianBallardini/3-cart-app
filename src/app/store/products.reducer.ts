import { createReducer, on } from "@ngrx/store";
import { ProductModel } from "../models/productModel";
import { load, findAll } from "./products.actions";

export interface ProductsInterface {
    productos: ProductModel[]
}

const initialState: ProductsInterface ={
    productos: []
};

export const productsReducer = createReducer(
    initialState,
    on(load, (state) => ({productos: [...state.productos]})),
    on(findAll, (state, {productos}) => {
        return {
            ...state,
            productos: productos
        }
    })
)