import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const ROLE_KEY = 'Role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public saveRole(role: string) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY,  role);
  }

  public getRole(): string {
    return sessionStorage.getItem(ROLE_KEY);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isUserLoggedIn(): boolean {
    console.log('token:' + sessionStorage.getItem(TOKEN_KEY));
    return sessionStorage.getItem(TOKEN_KEY) != null;
  }
}
