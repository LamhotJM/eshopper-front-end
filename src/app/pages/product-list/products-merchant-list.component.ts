import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-merchant-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsMerchantListComponent implements OnInit {

  //category_id: number;
  products: Object;

  constructor(private userService: UserService,private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.category_id = +params['id'];
    // });
    const account = this.userService.currentUserValue.account;
    console.log("products-merchant-list account:  "+account);
    this.service.getProductsByMerchant(account).subscribe(
      data =>   {
        this.products = data;
        console.log(this.products);
      }
    );

    // if (this.category_id) {
    //     this.service.getProductByCategory(this.category_id).subscribe(
    //       data => this.products = data['products']
    //     );
    // } else {
    //     this.service.getProducts().subscribe(
    //       data =>   {
    //         this.products = data;
    //         console.log(this.products);
    //       }
    //     );
    // }
  }

}
