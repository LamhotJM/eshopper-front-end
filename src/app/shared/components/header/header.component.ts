import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../../../modules/authentication/components/signin/service/token.storage';
import {Role} from '../model/role';
import {AuthService} from '../../../modules/authentication/components/signin/service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean;
  roles: Object;
  isAdmin: boolean;

  constructor(private router: Router, private token: TokenStorage, private authService: AuthService, ) {

    this.userLoggedIn = token.isUserLoggedIn();
  }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
          if (this.token.getRole() === ('ROLE_ADMIN')) {
            this.isAdmin = true;
          }
          console.log('Role of ' + this.token.getRole());
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['/home']);
    window.location.reload();

  }
}
