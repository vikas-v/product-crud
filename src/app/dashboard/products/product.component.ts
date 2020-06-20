import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import swal from 'bootstrap-sweetalert';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../services/product/Product';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().pipe(take(1)).subscribe((products) => {
      this.products = products;
    });
  }

  delete(productId: string) {
    swal({
      title: 'Are you sure?',
      text: 'Your will not be able to recover this product!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, () => {
      this.productService.remove(productId).subscribe((resp) => {
        swal('Deleted!', 'Your product has been deleted.', 'success');
      });
    });
  }
}
