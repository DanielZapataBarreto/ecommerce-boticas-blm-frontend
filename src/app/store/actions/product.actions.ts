import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const getAllProducts = createAction(
    '[Product] Get All Products',
);
export const getAllProductsSuccess = createAction(
    '[Product] Get All Products Success',
    props<{ products: Array<Product> }>()
);
export const getAllProductsFailure = createAction(
    '[Product] Get All Products Failure',
    props<{ error: string }>()
);
