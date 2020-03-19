import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin.service';
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
    pid: Number;
    sub;
    images: Object[];

    submitted = false;
    success = false;
    failed = false;
    message = '';
    querySub: Subscription;
    currentUser: JwtResponse;


    constructor(private adminService: AdminService, public route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.currentUser = this.userService.currentUserValue;
        this.sub = this.route.url.subscribe(params => {
            console.log('hello ' + params[1]);
            // tslint:disable-next-line:triple-equals
            //  if (params[1].path == 'image') {
            // tslint:disable-next-line:radix
            // @ts-ignore
            // tslint:disable-next-line:radix
            this.pid = Number.parseInt(params[1]);
            this.adminService.getProduct(this.pid).subscribe(
                (data) => {
                    this.images = JSON.parse(JSON.stringify(data)).images;
                    console.log(data);
                }, error => {
                    console.log(error);
                });

            //  }

        });


    }

    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      this.route.url.subscribe(params => {
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.pid = Number.parseInt(params[1]);
      });
    }

    onSubmit() {
        this.adminService.postFile(this.fileToUpload, this.pid).subscribe(
            (data) => {
                // do something, if upload success
                this.images.push(data);
                console.log(this.images);
                console.log(data);
            }, error => {
                console.log(error);
            });
    }

    ngOnDestroy(): void {
        this.querySub.unsubscribe();
    }
}
