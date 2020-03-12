import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  category_id: number;
  products: Object;

  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category_id = +params['id'];
    });

    if (this.category_id) {
        this.service.getProductByCategory(this.category_id).subscribe(
          data => this.products = data['products']
        );
    } else {
        this.service.getProducts().subscribe(
          data =>   {
            this.products = data;
            console.log(this.products);
          }
        );
    }
  }

}
