import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './service/auth.service';
import {TokenStorage} from './service/token.storage';
import { Credentials } from './model/credentials';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  credentials: Credentials = new Credentials();
  success = false;
  failed = false;
  message = '';

  constructor(private router: Router, private authService: AuthService, private token: TokenStorage) {
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.attemptAuth(this.credentials).subscribe(
      (data) => {
        // tslint:disable-next-line:prefer-const
        let userRole = JSON.parse(JSON.stringify(data)).user.role.type;
        const token = JSON.parse(JSON.stringify(data)).token;
        this.token.saveRole(token);
        this.token.saveToken(userRole);
        window.location.reload();
        this.router.navigate(['profile']);
      }, (error) => {
        this.failed = true;
        error.error.errors.forEach(element => {
          this.message += element.defaultMessage + '<br/>';
        });
      }
    );
  }
}
