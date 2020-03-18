import { Injectable } from '@angular/core';
import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInfo } from '../models/productInfo';
import {apiUrl} from '../../environments/environment';
import {JwtResponse} from '../response/JwtResponse';
import {UserService} from './user.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
  }

  //const currentUser = this.userService.currentUserValue;

 // currentUser: JwtResponse;

  getProfile(): Observable<Object> {
    return this.http.get(`${apiUrl}/customer/get`);
  }

  getProducts(): Observable<Object> {
    return this.http.get(`${apiUrl}/customer/get`);
  }

  getProduct(id: Number ): Observable<Object> {
    return this.http.get(`${apiUrl}/products/${id}`);
  }

  saveProduct(product: ProductInfo, productId: number ): Observable<Object> {
    const currentUser = this.userService.currentUserValue;
    let url = '';
    const memo = localStorage.getItem('currentUser');
    console.log(currentUser)

    if (productId == null) {
     url = `${apiUrl}/products/2`;
    } else {
      url = `${apiUrl}/products/2`;
    }

    return this.http.post(url, product);
  }

  postFile(fileToUpload: File, productId: Number): Observable<Object> {
   // let endpoint = 'http://localhost:9091/uploadFile/' + productId;
   const endpoint = `${apiUrl}/customer/get`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData); // , { headers: yourHeadersConfig });
}
}
