import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Order} from '../models/Order';
import {apiUrl} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderUrl = `${apiUrl}/orders/list`;
    private orderDetailUrl = `${apiUrl}/orders`;

    constructor(private http: HttpClient) {
    }

    getPage(page = 0, size = 10): Observable<any> {
        return this.http.get(`${this.orderUrl}?page=${page}&size=${size}`).pipe();
    }

    show(id): Observable<Order> {
        return this.http.get<Order>(`${this.orderDetailUrl}/${id}`).pipe(
            catchError(_ => of(null))
        );
    }

    cancel(id): Observable<Order> {
        return this.http.patch<Order>(`${this.orderDetailUrl}/cancel/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }

    checkout(id): Observable<Order> {
        return this.http.put<Order>(`${this.orderDetailUrl}/checkout`, {'orderId': id});
    }
}
