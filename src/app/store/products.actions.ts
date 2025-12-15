import { createAction, props } from "@ngrx/store";
import { ProductModel } from "../models/productModel";

export const load = createAction('[Catalogo] load');
export const findAll = createAction('[Catalogo] findAll', props<{productos: ProductModel[]}>());