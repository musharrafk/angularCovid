import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, CanActivate } from "@angular/router";
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList:any;
  constructor(public as: AuthService, public router: Router, public ADS:AdminService) { }

  ngOnInit() {
let parma={user_id:JSON.parse(localStorage.getItem('user_id')),order_status:1}
    this.ADS.getOrderList(parma).subscribe((res: any) => {
      this.orderList = res.result;

      console.log( this.orderList);
    })
    

  }

}
