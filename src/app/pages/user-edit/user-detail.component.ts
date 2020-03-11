import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Role} from '../../enum/Role';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {




    constructor(private userService: UserService,
                private router: Router) {
    }

    user = new User();


    ngOnInit() {
        const account = this.userService.currentUserValue.account;

        this.userService.get(account).subscribe( u => {
            this.user = u;
            this.user.password = '';
        }, e => {

        });
    }

    onSubmit() {
        this.userService.update(this.user).subscribe(u => {
            this.userService.nameTerms.next(u.firstName);
            let url = '/';
            // tslint:disable-next-line:triple-equals
            if (this.user.role != Role.Buyer) {
                url = '/seller';
            }
            this.router.navigateByUrl(url);
        }, _ => {});
    }

}
