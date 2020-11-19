// import { Route } from '@angular/compiler/src/core';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

   cartItems: any;
   totalAmmount: number = 0;
   data: any
   orderList:any
   orderForm :FormGroup;
  constructor(public AS:AdminService,public route: Router, public zone:NgZone, public fb:FormBuilder) { 

  
  
  }

  ngOnInit() {
  
      this.getData();
      this.initForm();
   
    
  }

  initForm() {
    this.orderForm = this.fb.group({
      patient_name: ['',Validators.required],
      patient_contact:  ['', Validators.required],
      patient_age:  ['', Validators.required]
    })
  }

  submit() {
    const value = this.orderForm.value;

    if(!this.orderForm.valid) {
      return alert('All fileds are required');
    }
    value.order = JSON.stringify(this.orderList);

   
    this.AS.placeOrder(value).subscribe(data => {
      
     
    });

    alert('success');

  this.route.navigateByUrl('admin/order')
  }

  getData() {
    this.AS.getProducts().subscribe(data => {
      this.cartItems = data;
     // console.log(data)

      this.totalAmmount = this.getTotalPrice();
      console.log(this.totalAmmount)
    });
    
let parma={user_id:JSON.parse(localStorage.getItem('user_id')),order_status:0}
    this.AS.getOrderList(parma).subscribe((res: any) => {
      this.orderList = res.result;

     
    })
  }

  removeItem(data:any)
  {
      alert(data);
      let param={id:data};
      this.AS.removeItem(param).subscribe((res: any) => {
 
      })
      this.AS.removeProductFromCart(data);

      this.getData();

        }

  getTotalPrice() {
    let total = 0;
    console.log(this.cartItems)
    this.cartItems.map(item => {
      total += Number(item.minPrice);
    });

    return total
  }

    // Remove item from cart list
    removeItemFromCart(productId) {
      /* this.cartItems.map((item, index) => {
        if (item.id === productId) {
          this.cartItems.splice(index, 1);
        }
      });
  
      this.AS.setProducts(this.cartItems); */
  
      this.AS.removeProductFromCart(productId);

      this.totalAmmount = this.getTotalPrice()
  
    }
  
    emptyCart() {
      this.AS.emptryCart();
    }

}
