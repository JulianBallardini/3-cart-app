import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product-service";
import { load, findAll } from "../products.actions";
import { exhaustMap, map } from "rxjs/operators";

@Injectable()
export class ProductsEffects {

    private actions$ = inject(Actions);
    private service= inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        this.service.findAll().pipe(
          map(products => findAll({ productos: products }))
        )
      )
    )
  );

}
