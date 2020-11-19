import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-user-package',
  templateUrl: './user-package.component.html',
  styleUrls: ['./user-package.component.css']
})
export class UserPackageComponent implements OnInit {

  data: any;
  searchword: any;
  filterargs: any;
  @Input() products: any = [];
  private singleProduct;
  private isAdded;
  constructor(public AS:AdminService) { }

  ngOnInit() {

    this.AS.getUserData().subscribe((res:any) => {
      // this.data = [];
      // this.data.push(res.result);
      this.products = res.result;
      console.log(this.data)
    })

    this.isAdded = new Array(this.products.length);
    this.isAdded.fill(false, 0, this.products.length);
    console.log('this.isAdded -> ', this.isAdded, this.products);

    this.AS.getProducts().subscribe(data => {

      if (data && data.length > 0) {

      } else {
        this.products.map((item, index) => {
          this.isAdded[index] = false;
        });
      }

    });

    // this.data = [{
    //   id: 1, image: "https://www.lawinsport.com/media/zoo/images/test_lab_b2770610eeb84eab7e34a508268746b8.jpg", title: "Title 1", price: "10"
    // },
    // { id: 2, image: "https://www.lawinsport.com/media/zoo/images/test_lab_b2770610eeb84eab7e34a508268746b8.jpg", title: "Title 2", price: "20" },
    // { id: 3, image: "https://www.lawinsport.com/media/zoo/images/test_lab_b2770610eeb84eab7e34a508268746b8.jpg", title: "Title 3", price: "30" },
    // ];
  }

  addToCart(event, productId,itemData) {
    
    // If Item is already added then display alert message
    if (event.target.classList.contains('btn-success')) {
      alert('This product is already added into cart.');
      return false;
    }

    // Change button color to green
    this.products.map((item, index) => {
      if (item.id === productId) {
        this.isAdded[index] = true;
      }
    })

    this.singleProduct = this.products.filter(product => {
      return product.id === productId;
    });

    // this.cartItems.push(this.singleProduct[0]);

    this.AS.addProductToCart(this.singleProduct[0]);


    const index = this.products.findIndex(x => x.id === itemData.id);
      alert(index)
      this.products.splice(index,1);

    let user: any = JSON.parse(localStorage.getItem("user_id"));
    
    console.log(user);
    let param={"data":this.singleProduct[0],"user_id":user}
    this.AS.AddCartData(param).subscribe((res:any) => {
      // this.data = [];
      // this.data.push(res.result);
      this.products = res.result;
      console.log(this.data)

      
    })

  }

  removeFromCart(id) {
    alert(id)
  }

  searchThis() {
    console.log(this.searchword)
    this.filterargs = { itemName: this.searchword }
  }

}
