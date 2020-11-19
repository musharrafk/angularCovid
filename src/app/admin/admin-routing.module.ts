import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ManageBlogsComponent } from "./manage-blogs/manage-blogs.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManagePagesComponent } from "./manage-pages/manage-pages.component";
import { BecomePhotographerComponent } from "./become-photographer/become-photographer.component";
import { ProfileComponent } from "./profile/profile.component";

import { AuthGuard } from "../auth/auth.guard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPackageComponent } from '../user-package/user-package.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent}  from './order/order.component'

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        children: [
          { path: "dashboard", component: DashboardComponent },
          { path: "total", component: UserPackageComponent },
          { path: "pending", component: AdminDashboardComponent },
          { path: "cart", component: CheckoutComponent },
                   { path: "order", component: OrderComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
