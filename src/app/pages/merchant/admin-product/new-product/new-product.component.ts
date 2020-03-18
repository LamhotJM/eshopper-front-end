import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfo } from '../../../../models/productInfo';
// @ts-ignore
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  product: any = new ProductInfo();
  submitted = false;
  success = false;
  failed = false;
  message = '';
  productId: number = null;
  pageHeading = 'New Product';
  productCategories: Object;
  sub;

  constructor(private adminService: AdminService, public route: ActivatedRoute) {
    this.sub = this.route.url.subscribe(params => {
      // tslint:disable-next-line:triple-equals
      if (params[1].path == 'edit') {
        // tslint:disable-next-line:radix
        this.productId = Number.parseInt(params[2].path);
        this.pageHeading = 'Update Product';
      }

    });
  }

  ngOnInit() {
    if (this.productId != null) {
      this.adminService.getProduct(this.productId).subscribe(
        (data) => {
          this.product = data;
        }, (error) => {
        }
      );
    }
    this.adminService.getCategories().subscribe(
      (data) => {
          this.productCategories = data;
      }, (error) => {
          console.log(error);
      }
    );

  }

  save() {

    this.adminService.saveProduct(this.product, this.productId)
      .subscribe((data) => {

        const retObj = JSON.parse(JSON.stringify(data));
        // tslint:disable-next-line:triple-equals
        this.success = retObj.ok != undefined ? retObj.ok : retObj.success;
        this.message = JSON.parse(JSON.stringify(data)).message;
        this.product = new ProductInfo();
      }, (error) => {
        const errorObject = JSON.parse(JSON.stringify(error.error));
        this.failed = !errorObject.ok;
        if (errorObject.message) {
          this.message = errorObject.message;
        } else {

          error.error.errors.forEach(element => {
            this.message += element.defaultMessage + '<br/>';
          });
        }

      });
    if (this.success) {
      this.submitted = true;
    }

  }

  onSubmit() {
    this.success = false;
    this.failed = false;
    this.message = '';
    this.save();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
