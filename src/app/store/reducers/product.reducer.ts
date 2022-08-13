import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import {
    getAllProducts,
    getAllProductsFailure,
    getAllProductsSuccess,
} from '../actions/product.actions';

export interface State {
    products: Array<Product>;
    loading: boolean;
    error?: string;
}

export const initialState: State = {
    products: [],
    loading: false,
};

const _productReducer = createReducer(
    initialState,
    on(getAllProducts, (state) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(getAllProductsSuccess, (state, { products }) => {
        return {
            ...state,
            products,
            loading: false,
        };
    }),
    on(getAllProductsFailure, (state, { error }) => {
        return {
            ...state,
            error: error,
            products: [],
            loading: false,
        };
    })
);

export function productReducer(state: any, action: any) {
    return _productReducer(state, action);
}

export const selectProductState = createFeatureSelector<State>('product');
export const selectProductsFromProductState = createSelector(
    selectProductState,
    (state) => state.products
);
export const selectIsLoadingFromProductState = createSelector(
    selectProductState,
    (state) => state.loading
);
export const selectPersonalCareProductsFromProductState = createSelector(
    selectProductState,
    (state) => state.products.filter(product => product.categories.includes('Cuidado Personal')).slice(0, 4)
)
export const selectHairCareProductsFromProductState = createSelector(
    selectProductState,
    (state) => state.products.filter(product => product.categories.includes('Cabello')).slice(0, 4)
)
export const selectMedicineProductsFromProductState = createSelector(
    selectProductState,
    (state) => state.products.filter(product => product.categories.includes('Medicamentos')).slice(0, 4)
)
