import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ProductService } from 'src/app/services/product/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  modalRef: BsModalRef;

  productForm: FormGroup;
  isSubmitted = false;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      rate: ['', Validators.required],
      quality: ['', Validators.required]
    });
  }

  get formControls() { return this.productForm.controls; }

  openModal(template: TemplateRef<any>) {
    this.productForm.patchValue({name: '', rate: '', quality: ''});
    this.productForm.markAllAsTouched();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  add(): void {
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.modalRef.hide();
    this.productService.add(this.productForm.value).pipe(take(1)).subscribe((res) => {
      this.isSubmitted = false;
      this.errorMsg = '';
    }, (error) => {
      this.errorMsg = error;
      this.isSubmitted = false;
    });
  }

}
