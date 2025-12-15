import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product'; 
import { CommonModule, NgIf } from '@angular/common'; 

@Component({
  selector: 'app-product-form',
  standalone: true,
 
  imports: [ReactiveFormsModule, CommonModule, NgIf], 
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  
  productForm = this.fb.group({
    
    name: ['', [Validators.required, Validators.minLength(3)]], 
    
    description: ['', Validators.required], 
   
    price: [0.01, [Validators.required, Validators.min(0.01)]], 
   
    category: ['hombre', Validators.required], 
    
    image: ['https://e01-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/03/16280001219476.jpg', Validators.required], 
    
    active: [true] 
  });

  
  get f() { return this.productForm.controls; }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); 
      return;
    }
    
    
    const newProduct = this.productForm.value as any; 
    
    this.productService.addProduct(newProduct); 
    
    this.productForm.reset({ 
      name: '', description: '', price: 0.01, category: 'hombre', 
      image: 'https://e01-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/03/16280001219476.jpg', active: true
    });
    
    alert('Producto dado de alta y añadido a la lista.');
  }
}