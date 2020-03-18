import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProductInfo} from '../models/productInfo';
import { LocaleStorageService } from '../services/locale-storage.service';

import {apiUrl} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = `${apiUrl}/products/list/`;
    private categoryUrl = `${apiUrl}/category`;

    constructor(private http: HttpClient, private localStorage: LocaleStorageService) {
    }

    getAllInPage(page: number, size: number): Observable<any> {
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.http.get(url)
            .pipe(
                // tap(_ => console.log(_)),
            );
    }

    getCategoryInPage(categoryType: number, page: number, size: number): Observable<any> {
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.http.get(url).pipe(
            // tap(data => console.log(data))
        );
    }

    getDetail(id: String): Observable<ProductInfo> {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<ProductInfo>(url).pipe(
            catchError(_ => {
                console.log('Get Detail Failed');
                return of(new ProductInfo());
            })
        );
    }

    update(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/${productInfo.id}/edit`;
        return this.http.put<ProductInfo>(url, productInfo);
    }

    create(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/products/2`;
        return this.http.post<ProductInfo>(url, productInfo);
    }


    delete(productInfo: ProductInfo): Observable<any> {
        const url = `${apiUrl}/seller/product/${productInfo.id}/delete`;
        return this.http.delete(url);
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    getProductByCategory(id: number) {
        return this.http.get(`${apiUrl}/product/category/get/${id}`);
    }

    getProducts() {
        return this.http.get(`${apiUrl}/products/list/`);
    }

    getProduct(id: number) {
        return this.http.get(`${apiUrl}/products/${id}`);
    }

    addProductToCart(product_id: string, quantity: string) {
        const cart_id = this.localStorage.getCartId();
        if ( cart_id != null) {
            return this.http.post(
                `${apiUrl}/orders/add-cart`,
                {productId: product_id, quantity: quantity, cartId: cart_id, userId: 3}
            );
        } else {
            return this.http.post(
                `${apiUrl}/orders/add-cart`,
                {productId: product_id, quantity: quantity,  userId: 3}
            );
        }
    }
}
