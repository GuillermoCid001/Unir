import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 


import { ProductService } from '../product'; 


import { ProductCardComponent } from '../product-card/product-card'; 

@Component({
  selector: 'app-products-list',
  standalone: true,

  imports: [ProductCardComponent, CommonModule], 
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsListComponent {
  private productService = inject(ProductService);
  
  products = this.productService.products; 
}