import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';
import { take } from 'rxjs/operators';
import { Product } from '../services/product/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string;
  products: Product[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService) {
    this.username = this.authService.user.name;
  }

  ngOnInit() {
    this.fetchProducts();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  fetchProducts(): void {
    this.productService.getProducts().pipe(take(1)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
