import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../product'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
 
  imports: [FormsModule, CommonModule], 
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css'
})
export class ProductFilterComponent {
  private productService = inject(ProductService);

  
  filter = {
    name: '',
    category: '', 
    maxPrice: null as number | null, 
    active: 'all' as 'all' | 'true' | 'false' 
  };

 
  applyFilters(): void {
    this.productService.applyFilters(
      this.filter.name,
      this.filter.category,
      this.filter.maxPrice,
      this.filter.active
    );
  }

 
  resetFilters(): void {
    this.filter = {
      name: '',
      category: '',
      maxPrice: null,
      active: 'all'
    };
   
    this.productService.loadProducts(); 
  }
}