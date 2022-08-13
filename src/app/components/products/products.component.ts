import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product.model';
import * as CartActions from '../../store/actions/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<any> = [];
  categories: any[] = [
    { value: 'todos', viewValue: 'Todos' },
    { value: 'cuidadoPersonal', viewValue: 'Cuidado Personal' },
    { value: 'cabello', viewValue: 'Cuidado del Cabello' },
    { value: 'medicamentos', viewValue: 'Medicamentos' },
  ];
  filter: FormControl;
  loading: Boolean = false;
  baseUrl: string = `${environment.apiBaseUrl}/uploads`;

  constructor(private productService: ProductService, private store: Store) {
    this.filter = new FormControl('todos', []);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): any {
    this.loading = true;
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.loading = false;
    });
  }

  onChangeCategoriesSelect(value: any, event: any): any {
    if (event.isUserInput) {
      this.loading = true;
      switch (value) {
        case 'todos':
          this.productService.getAllProducts().subscribe((res) => {
            this.products = res;
            this.loading = false;
          });
          break;
        case 'cuidadoPersonal':
          this.productService
            .filterProducts('?category=CuidadoPersonal')
            .subscribe((res) => {
              this.products = res;
              this.loading = false;
            });
          break;
        case 'cabello':
          this.productService
            .filterProducts('?category=Cabello')
            .subscribe((res) => {
              this.products = res;
              this.loading = false;
            });
          break;
        case 'medicamentos':
          this.productService
            .filterProducts('?category=Medicamentos')
            .subscribe((res) => {
              this.products = res;
              this.loading = false;
            });
          break;
      }
    }
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.addProductToCart({ product }));
  }
}
