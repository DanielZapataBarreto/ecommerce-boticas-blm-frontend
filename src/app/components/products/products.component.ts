import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, Validators } from '@angular/forms';

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

  constructor(private productService: ProductService) {
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

  onChangeCategoriesSelect(value: any): any {
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
