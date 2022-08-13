import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const addProductToCart = createAction(
    '[Cart] Add Product to Cart',
    props<{ product: Product }>()
)

export const removeProductToCart = createAction(
    '[Cart] Remove Product from Cart',
    props<{ title: string }>()
)
