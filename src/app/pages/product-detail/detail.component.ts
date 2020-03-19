import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ProductService } from '../../services/product.service';
declare let swal: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import {Subscription} from 'rxjs';
import {JwtResponse} from '../../response/JwtResponse';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class DetailComponent implements OnInit ,  OnDestroy {


  id: number;
  quantity: string;
  product: object;
  cart: object;
  dataLoaded: Promise<boolean>
  currentUser: JwtResponse;
  querySub: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: ProductService,
    private localeStorage: LocaleStorageService,
              private userService: UserService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    this.quantity = '1';
    this.querySub = this.route.params.subscribe(params => {
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
        this.router.navigateByUrl('products');
      }
    );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

}
