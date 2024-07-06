import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class CurrencyRateServiceService {

  constructor(private http: HttpClient) { }

  GetCurrency(): Observable<any> {
    return this.http.get(
      '/api',
      httpOptions
    )
  }
}

