import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductPayload } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.npoint.io/1dee63ad8437c82b24fe'; 

  private initialProducts = signal<Product[]>([]); 
  
  products = signal<Product[]>([]); 

  private http = inject(HttpClient); 

  constructor() {

    this.loadProducts();
  }
  

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.initialProducts.set(data);
        this.products.set(data);
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  addProduct(newProduct: ProductPayload): void {

    const productWithId: Product = { 
      ...newProduct, 
      _id: crypto.randomUUID() 
    };
    

    this.initialProducts.update(current => [...current, productWithId]);
    this.products.update(current => [...current, productWithId]);
  }

  deleteProduct(id: string): void {

    this.initialProducts.update(current => current.filter(p => p._id !== id));
    this.products.update(current => current.filter(p => p._id !== id));
  }


  applyFilters(
    name: string, 
    category: string, 
    maxPrice: number | null, 
    activeStatus: 'all' | 'true' | 'false'
  ): void {

    let filteredList = this.initialProducts(); 
    

    
    if (name) {
      filteredList = filteredList.filter(p => 
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (category) {
      filteredList = filteredList.filter(p => p.category === category);
    }

    if (maxPrice !== null && maxPrice > 0) {
      filteredList = filteredList.filter(p => p.price <= maxPrice);
    }
    
    if (activeStatus !== 'all') {
      const activeBool = activeStatus === 'true';
      filteredList = filteredList.filter(p => p.active === activeBool);
    }

    this.products.set(filteredList);
  }
}