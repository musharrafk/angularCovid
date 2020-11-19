import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, CanActivate } from "@angular/router";
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  moduleData: any;
  private cartProductCount: number = 0;
  constructor(public as: AuthService, public router: Router, public ADS:AdminService) { }

  ngOnInit() {

    this.ADS.getProducts().subscribe(data => {
      this.cartProductCount = data.length;
    })
    // const storedData = JSON.parse(localStorage.getItem('currentUser'));
    // this.moduleData = storedData.data;

  }

  logOut() {
    this.as.logout();
    // console.log("hit");
    location.reload();
    this.router.navigate(['']);
  }

}
