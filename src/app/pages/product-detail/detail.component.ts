import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ProductService } from '../../services/product.service';
declare let swal: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class DetailComponent implements OnInit {

  id: number;
  quantity: string;
  product: object;
  cart: object;
  dataLoaded: Promise<boolean>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: ProductService,
    private localeStorage: LocaleStorageService
  ) { }

  ngOnInit() {
    this.quantity = '1';
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getProduct(this.id).subscribe(
      data => {
        this.product = data;
        this.dataLoaded = Promise.resolve(true);
      }
    );
  }

  addProductToCart(product_id) {
    this.service.addProductToCart(product_id, this.quantity).subscribe(
      data =>  {
        this.cart = data;
        this.localeStorage.saveCartId(data['cartId']);
        swal('Done!', 'Add to card success', 'success');
        this.router.navigateByUrl('products');
      }
    );
  }

}
