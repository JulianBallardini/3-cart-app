import { createAction, props } from "@ngrx/store";
import { ProductModel } from "../models/productModel";
import { CartItem } from "../models/cartItems";

export const addCartItem = createAction('[Cart-App] addCartItem', props<{producto: ProductModel}>());
export const removeItem = createAction('[Cart-App] removeItem', props<{id: number}>());
export const total = createAction('[Cart-App] total');