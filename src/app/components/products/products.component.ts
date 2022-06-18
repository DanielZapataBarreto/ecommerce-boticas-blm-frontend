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

  constructor(private productService: ProductService) {
    this.filter = new FormControl('todos', []);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): any {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  onChangeCategoriesSelect(value: any): any {
    switch (value) {
      case 'todos':
        this.productService.getAllProducts().subscribe((res) => {
          this.products = res;
        });
        break;
      case 'cuidadoPersonal':
        this.productService
          .filterProducts('?category=CuidadoPersonal')
          .subscribe((res) => {
            this.products = res;
          });
        break;
      case 'cabello':
        this.productService
          .filterProducts('?category=Cabello')
          .subscribe((res) => {
            this.products = res;
          });
        break;
      case 'medicamentos':
        this.productService
          .filterProducts('?category=Medicamentos')
          .subscribe((res) => {
            this.products = res;
          });
        break;
    }
  }
}
