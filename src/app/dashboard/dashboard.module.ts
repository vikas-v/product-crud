import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './products/product.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class DashboardModule { }
