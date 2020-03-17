import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Order} from '../models/Order';
import {apiUrl} from '../../environments/environment';
import {Merchant} from '../models/Merchant';

@Injectable({
    providedIn: 'root'
})
export class MerchantService {

    private merchantUrl = `${apiUrl}/users/merchantsByStatus`;
    private merchantApproveUrl = `${apiUrl}/users/merchantApproval`;


    private userUrl = `${apiUrl}/users`;

    constructor(private http: HttpClient) {
    }

    getPage(page = 0, size = 10, status= 0): Observable<any> {
        return this.http.get(`${this.merchantUrl}?page=${page}&size=${size}&status=${status}`).pipe();
    }

    show(email): Observable<Merchant> {
        return this.http.get<Merchant>(`${this.userUrl}/${email}`).pipe(
            catchError(_ => of(null))
        );
    }
    approve(id): Observable<Merchant> {
        return this.http.put<Merchant>(`${this.merchantApproveUrl}/${id}/1`, null).pipe(
            catchError(_ => of(null))
        );
    }
}
