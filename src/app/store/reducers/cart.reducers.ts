import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import {
    addProductToCart,
    removeProductToCart
} from '../actions/cart.actions';

export interface CartProduct {
    title: string,
    description: string,
    quantity: number,
    image: string,
    price: number,
    categories: Array<string>;
    stock: number;
    totalPrice: number
}

export interface State {
    items: CartProduct[];
    totalQuantity: number;
}

export const initialState: State = {
    items: [],
    totalQuantity: 0
};

const _cartReducer = createReducer(
    initialState,
    on(addProductToCart, (state, { product }) => {
        const newItem = product;
        const existingItem = state.items.find(item => item.title === newItem.title);
        const itemsCopy = state.items.slice();
        if (!existingItem) {
            itemsCopy.push({
                title: newItem.title,
                description: newItem.description,
                quantity: 1,
                price: newItem.price,
                totalPrice: newItem.price,
                image: newItem.image,
                categories: newItem.categories,
                stock: newItem.stock
            })
            return {
                ...state,
                items: itemsCopy,
                totalQuantity: state.totalQuantity + 1
            }
        } else {
            const existingItemIndex = state.items.findIndex(item => item.title === newItem.title);
            itemsCopy[existingItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
                totalPrice: existingItem.totalPrice + newItem.price
            }
            return {
                ...state,
                items: itemsCopy,
                totalQuantity: state.totalQuantity + 1
            }
        }
    }),
    on(removeProductToCart, (state, { title }) => {
        const existingItem = state.items.find(item => item.title === title)!;
        let itemsCopy: CartProduct[] = state.items.slice();
        if (existingItem?.quantity === 1) {
            itemsCopy = itemsCopy.filter(item => item.title !== title);
            return {
                ...state,
                items: itemsCopy,
                totalQuantity: state.totalQuantity - 1
            }
        } else {
            const existingItemIndex = state.items.findIndex(item => item.title === title);
            itemsCopy[existingItemIndex] = {
                ...existingItem,
                quantity: existingItem?.quantity - 1,
                totalPrice: existingItem?.totalPrice - existingItem?.price
            }
            return {
                ...state,
                items: itemsCopy,
                totalQuantity: state.totalQuantity - 1
            }
        }
    })
);

export function cartReducer(state: any, action: any) {
    return _cartReducer(state, action);
}

export const selectCartState = createFeatureSelector<State>('cart');
export const selectTotalQuantityFromCartState = createSelector(
    selectCartState,
    (state) => state.totalQuantity
);
export const selectCartItemsFromCartState = createSelector(
    selectCartState,
    (state) => state.items
);
export const selectTotalAmountFromCartState = createSelector(
    selectCartState,
    (state) => {
        let totalAmount = 0;
        state.items.forEach(item => totalAmount += item.quantity * item.price)
        return totalAmount;
    }
)