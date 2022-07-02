import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Array<any> = [];
  personalCareProducts: Array<any> = [];
  medicineProducts: Array<any> = [];
  hairCareProducts: Array<any> = [];
  loading: Boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): any {
    this.loading = true;
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.initializeProductsList(this.products);
      this.loading = false;
    });
  }

  initializeProductsList(products: Array<any>): any {
    this.personalCareProducts = products
      .filter((product: any) => product.categories.includes('CuidadoPersonal'))
      .slice(0, 4);
    this.hairCareProducts = products
      .filter((product: any) => product.categories.includes('Cabello'))
      .slice(0, 4);
    this.medicineProducts = products
      .filter((product: any) => product.categories.includes('Medicamentos'))
      .slice(0, 4);
  }
}
