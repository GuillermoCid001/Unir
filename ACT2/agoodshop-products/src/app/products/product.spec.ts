import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product'; 
import { Product, ProductPayload } from '../models/product.model'; 

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  
  const dummyProducts: Product[] = [
    { _id: '1', name: 'Zapatos Deportivos', description: 'desc', price: 10, category: 'hombre', image: 'img', active: true },
    { _id: '2', name: 'Blusa de Seda', description: 'desc', price: 20, category: 'mujer', image: 'img', active: false }
  ];
  const apiUrl = 'https://jsonblob.com/api/1313446273633935360';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    
    
    const req = httpMock.expectOne(apiUrl);
    req.flush(dummyProducts);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('1. El servicio debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('2. Debe cargar los productos en la inicialización', () => {
   
    expect(service.products().length).toBe(2);
    expect(service.products()[0].name).toBe('Zapatos Deportivos');
  });

  it('3. Debe añadir un producto y actualizar la lista', () => {
    const initialLength = service.products().length;
    const newProductPayload = { name: 'Gorra', description: 'new', price: 5, category: 'niño', image: 'img', active: true };
    
    service.addProduct(newProductPayload);

    
    expect(service.products().length).toBe(initialLength + 1);
    
    expect(service.products().pop()?.name).toBe('Gorra');
  });

  it('4. Debe eliminar un producto por ID', () => {
    service.deleteProduct('1'); 

    
    expect(service.products().length).toBe(1);
    
    expect(service.products()[0].name).toBe('Blusa de Seda');
  });
  
  it('5. Debe filtrar productos por nombre', () => {
    service.applyFilters('blusa', '', null, 'all');
    
    expect(service.products().length).toBe(1);
    expect(service.products()[0].name).toBe('Blusa de Seda');
  });
  
  it('6. Debe resetear el filtro si los parámetros están vacíos', () => {
    service.applyFilters('blusa', '', null, 'all'); 
    expect(service.products().length).toBe(1);
    
    service.applyFilters('', '', null, 'all'); 
    
    expect(service.products().length).toBe(2); 
  });
});