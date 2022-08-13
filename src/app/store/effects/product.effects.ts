import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import {
    showNotification,
} from 'src/app/shared/utils/messages.util';
import * as ProductActions from '../actions/product.actions';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
    ) { }

    getAllProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.getAllProducts),
            exhaustMap(() =>
                this.productService.getAllProducts().pipe(
                    map((products) =>
                        ProductActions.getAllProductsSuccess({ products })
                    ),
                    catchError(({ error }) =>
                        of(ProductActions.getAllProductsFailure({ error }))
                    )
                )
            )
        )
    );
    getAllProductsFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductActions.getAllProductsFailure),
                tap(({ error }) => {
                    showNotification('failure', `${error}`);
                })
            ),
        { dispatch: false }
    );
}
