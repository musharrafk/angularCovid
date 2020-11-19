import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URL = "http://localhost/convid/login/"
  public cartItems = [];
  public products = new Subject();
  constructor(public http: HttpClient, public FB: FormBuilder) { }

  getProducts(): Observable<any> {
    console.log('this.cartItems :', this.cartItems);
    return this.products.asObservable();
  }

  setProducts(products) {
    console.log(products)
    this.cartItems.push(...products);
    this.products.next(products);
  }

  // Add single product to the cart
  addProductToCart(product) {
    console.log(product)
    this.cartItems.push(product);
    this.products.next(this.cartItems);
  }

  // Remove single product from the cart
  removeProductFromCart(productId) {
    this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    // Update Observable value
    this.products.next(this.cartItems);
  }

  // Remove all the items added to the cart
  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    let total = 0;
    console.log(this.cartItems)
    this.cartItems.map(item => {
      total += item.minPrice;
    });

    return total
  }

  
  form: FormGroup = this.FB.group({
    id: [''],
    account_owner: [''],
    account_name: [''],
    biling_state: [''],
    billing_street: [''],
    billing_city: [''],
    account_id: [''],
    created_by: [''],
    industry: [''],
    sub_industry: [''],
    email_id: [''],
    phone: [''],
    mobile: [''],
    created_date: [''],
    brand_name: [''],
    brand: [''],
  });
  initializeFormGroup() {
    this.form.setValue({
      id: [''],
      account_owner: [''],
      account_name: [''],
      biling_state: [''],
      billing_street: [''],
      billing_city: [''],
      account_id: [''],
      created_by: [''],
      industry: [''],
      sub_industry: [''],
      email_id: [''],
      phone: [''],
      mobile: [''],
      created_date: [''],
      brand_name: [''],
      brand: [''],
    });
  }

  getUserData() {
    return this.http.post(`${this.API_URL}itemDetails`,{})
  }

  populateForm(lessonData: any) {
    this.form.setValue(lessonData);
  }

  AddCartData(param) {
    return this.http.post(`${this.API_URL}addtoCart`,param)
  }
  getOrderList(param){
    return this.http.post(`${this.API_URL}getuserOrder`,param)
  }

  removeItem(param){

    return this.http.post(`${this.API_URL}deleteItem`,param)
  }
  placeOrder(param){

    return this.http.post(`${this.API_URL}placeOrder`,param)
  }

  
  getSubIndustry() {
    return this.http.get('http://13.127.41.55/~hefdgtrgedrg/sfdc_api/public/getSubIndustry');
    // return this.http.get('http://localhost:8000/getSubIndustry')
  }

  getIndustry() {
    return this.http.get('http://13.127.41.55/~hefdgtrgedrg/sfdc_api/public/getIndustry');
    // return this.http.get('http://localhost:8000/getIndustry')
  }

  getbrand() {
    // return this.http.get('http://13.127.41.55/~hefdgtrgedrg/sfdc_api/public/getbrand');
    return this.http.get('http://localhost:8000/getbrand')
  }

  getIndeed(param) {
    return this.http.post('http://13.127.41.55/~hefdgtrgedrg/sfdc_api/public/getAllRec', param);
    // return this.http.post('http://localhost:8000/getAllRec', param);

  }

  getDataByBrand(param) {
    // return this.http.post('http://13.127.41.55/~hefdgtrgedrg/sfdc_api/public/schoolData', param);
    return this.http.get('http://13.127.41.55/~hefdgtrgedrg/sfdc_api/public/schoolData');

  }
}
