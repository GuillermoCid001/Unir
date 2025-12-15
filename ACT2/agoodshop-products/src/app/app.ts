import { Component } from '@angular/core'; 


import { ProductsListComponent } from './products/products-list/products-list'; 
import { ProductFormComponent } from './products/product-form/product-form';
import { ProductFilterComponent } from './products/product-filter/product-filter';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductsListComponent, 
    ProductFormComponent, 
    ProductFilterComponent 
  ],
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'agoodshop-products';
  currentYear = new Date().getFullYear();
}