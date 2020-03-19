import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../../services/user.service';
import {JwtResponse} from '../../../../response/JwtResponse';

@Component({
  selector: 'app-upload-product-image',
  templateUrl: './upload-product-image.component.html',
  styleUrls: ['./upload-product-image.component.css']
})
export class UploadProductImageComponent implements OnInit, OnDestroy {
  fileToUpload: File = null;
  productId: Number;
  sub;
  productImages: Object[];

  submitted = false;
  success = false;
  failed = false;
  message = '';
  querySub: Subscription;
  currentUser: JwtResponse;



  constructor(private adminService: AdminService, public route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    this.sub = this.route.url.subscribe(params => {
      // tslint:disable-next-line:triple-equals
      if (params[1].path == 'image-upload') {
        // tslint:disable-next-line:radix
        this.productId = Number.parseInt(params[2].path);
        this.adminService.getProduct(this.productId).subscribe(
          (data) => {
            this.productImages = JSON.parse(JSON.stringify(data)).productImages;
          console.log(data);
        }, error => {
          console.log(error);
        });

      }

    });


  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.adminService.postFile(this.fileToUpload, this.productId).subscribe(
      (data) => {
      // do something, if upload success
      this.productImages.push(data);
      console.log(this.productImages);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
