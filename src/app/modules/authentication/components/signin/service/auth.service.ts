import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../../../../shared/config/globals.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private globals: Globals) {
  }

  attemptAuth(credentials: Object): Observable<Object> {
    console.log('attempAuth ::');
    return this.http.post(this.globals.BASE_API_URL + 'users/login', credentials);
  }


}
