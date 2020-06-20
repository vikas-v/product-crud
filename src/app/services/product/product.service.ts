import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];
  constructor() {}

  add(item): Observable<any> {
    const product = new Product(item);
    this.products.push(product);
    return of(product);
  }

  remove(productId): Observable<boolean> {
    const index = this.products.findIndex((product) => (product.id === productId));
    if (index !== -1) {
      this.products.splice(index, 1);
      return of(true);
    } else {
      return of(false);
    }
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

}
