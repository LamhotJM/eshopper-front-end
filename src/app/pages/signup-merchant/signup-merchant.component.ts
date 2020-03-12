import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
// @ts-ignore
import {User} from '../../models/User';
// @ts-ignore
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-merchant.component.html',
  styleUrls: ['./signup-merchant.component.css']
})
export class SignMerchantComponent implements OnInit {

  user: User;

  constructor( private location: Location,
               private userService: UserService,
               private router: Router) {
    this.user = new User();

  }



  ngOnInit() {


  }
  onSubmit() {
    this.userService.signUpMerchant(this.user).subscribe(u => {
      this.router.navigate(['/login']);
    },
        e => {});
  }

}
