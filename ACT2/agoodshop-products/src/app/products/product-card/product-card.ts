import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../product';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-card',
  standalone: true,
 
  imports: [CommonModule], 
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
 
  @Input({ required: true }) product!: Product; 
  
  private productService = inject(ProductService);

  onDelete(id: string): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el producto: ${this.product.name}?`)) {
     
      this.productService.deleteProduct(id); 
    }
  }
}