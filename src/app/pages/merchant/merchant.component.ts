import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MerchantService} from '../../services/merchant.service';
import {Merchant} from '../../models/Merchant';
import {UserService} from '../../services/user.service';
import {JwtResponse} from '../../response/JwtResponse';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Role} from '../../enum/Role';

@Component({
    selector: 'app-merchant',
    templateUrl: './merchant.component.html',
    styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit, OnDestroy {

    page: any;
    currentUser: JwtResponse;
    Role = Role;
    constructor(private httpClient: HttpClient,
                private merchantService: MerchantService,
                private userService: UserService,
                private route: ActivatedRoute
    ) {
    }

    querySub: Subscription;

    ngOnInit() {
        this.currentUser = this.userService.currentUserValue;
        this.querySub = this.route.queryParams.subscribe(() => {
            this.update();
        });

    }

    update() {
        let nextPage = 0;
        let size = 10;
        const status = 0;
        if (this.route.snapshot.queryParamMap.get('page')) {
            nextPage = +this.route.snapshot.queryParamMap.get('page');
            size = +this.route.snapshot.queryParamMap.get('size');
        }
        this.merchantService.getPage(nextPage, size, status).subscribe(page => this.page = page, _ => {
            console.log('Get merchant Failed');
        });
    }


    approve(merchant:  Merchant) {
        this.merchantService.approve(merchant.id).subscribe(res => {
            if (res) {
                merchant.approved = res.approved;
            }
        });

    }

    ngOnDestroy(): void {
     //   this.querySub.unsubscribe();
    }

}
