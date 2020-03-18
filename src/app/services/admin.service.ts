import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInfo } from '../models/productInfo';
import {apiUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<Object> {
    return this.http.get(`${apiUrl}/customer/get`);
  }
  getCategory(id: number ): Observable<Object> {
    return this.http.get(`${apiUrl}product/category/get/${id}`);
  }

  getProducts(): Observable<Object> {
    return this.http.get(`${apiUrl}/customer/get`);
  }

  getProduct(id: Number ): Observable<Object> {
    return this.http.get(`${apiUrl}/customer/get`);
  }

  saveProduct(product: ProductInfo, productId: number ): Observable<Object> {
    let url = '';
    if (productId == null) {
      url = `${apiUrl}/customer/get`;
    } else {
      url = `${apiUrl}/customer/get`;
    }

    return this.http.post(url, product);
  }

  getCategories() {
    return this.http.get(`${apiUrl}/customer/get`);
  }

  postFile(fileToUpload: File, productId: Number): Observable<Object> {
   // let endpoint = 'http://localhost:9091/uploadFile/' + productId;
   const endpoint = `${apiUrl}/customer/get`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData); // , { headers: yourHeadersConfig });
}
}
