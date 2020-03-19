import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  category_id: string;
  products: Object;
  pathSubscription: Subscription;
  cat$: any;
  itemsSrv: any;

  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit() {
    
    this.pathSubscription =  this.route.params.subscribe(params => {
      this.category_id = params['id'];
      if (this.category_id) {
        console.log("category id: "+this.category_id);
        this.service.getProductByCategory(+this.category_id).subscribe(
          data =>   {
            this.products = data;
            console.log(this.products);
          }
        );
      } 
    });

    // if (this.category_id) {
    //   console.log("category id: "+this.category_id);
    //   this.service.getProductByCategory(+this.category_id).subscribe(
    //     data =>   {
    //       this.products = data;
    //       console.log(this.products);
    //     }
    //   );
    // } else {
    //   this.service.getProducts().subscribe(
    //       data =>   {
    //         this.products = data;
    //         console.log(this.products);
    //       }
    //   );
    // }
    
  }

  ngOnDestroy() {
    this.route.params = null;
    this.pathSubscription.unsubscribe();
  }

}
