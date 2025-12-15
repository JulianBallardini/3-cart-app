import { createReducer, on } from "@ngrx/store";
import { addCartItem, removeItem, total } from "./items.actions";
import { CartItem } from "../models/cartItems";

export interface ItemsState {
    items: CartItem[],
    total: number
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0
};

export const itemsReducer = createReducer(
    initialState,
    on(addCartItem, (state, { producto }) => {
        const hasItem = state.items.find((item: CartItem) => item.product.id == producto.id);
        
        if(hasItem) {
                return {
                    ... state,
                    items: state.items.map((item: CartItem) => {
                        if (item.product.id == producto.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        } else {
                            return item;
                        }
                    })
                }
        } else {
                return {
                    ... state,
                    items: [... state.items, { product: { ...producto }, quantity: 1 }],
                };
        }
    }),
    on(removeItem, (state, {id}) => {
        return{
            ... state,
            items: state.items.filter((item: CartItem) => {
                return item.product.id != id;
            })
        }
    }),
    on(total, (state) =>{
        return {
            ... state,
            total: state.items.reduce((acumulador, item) => acumulador += item.quantity * item.product.price, 0)
        }
    })
)