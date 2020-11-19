import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { BecomePhotographerComponent } from './become-photographer/become-photographer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatTableModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPackageComponent } from '../user-package/user-package.component';
import { MyFilterPipe } from '../user-package/MyFilterPipe';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
// import { HttpClientXsrfModule, HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageBlogsComponent,
    ManageCategoriesComponent,
    ManagePagesComponent,
    BecomePhotographerComponent,
    ProfileComponent,
    
    DashboardComponent,
    UserPackageComponent,
    MyFilterPipe,
    CheckoutComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    LayoutModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    AgGridModule.withComponents([]),
    AdminRoutingModule
  ],
  entryComponents: []
})
export class AdminModule { }
