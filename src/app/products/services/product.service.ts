import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  constructor() {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`);
  }
}
