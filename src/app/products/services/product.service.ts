import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

//TODO: add virtual/infinite scroll when the response is larger hence why I added the limit query param
export class ProductService {
  private readonly http = inject(HttpClient);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getProducts(limit?: number, sort?: string): Observable<Product[]> {
    let params = new HttpParams();

    // Conditionally append parameters

    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (sort) {
      params = params.append('sort', sort);
    }

    return this.http
      .get<Product[]>(`${environment.apiUrl}/products`, { params })
      .pipe(
        map((products) => products),
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<string[]>(`${environment.apiUrl}/products/categories`)
      .pipe(
        map((categories) => {
          return categories;
        }),
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    this.loadingSubject.next(true);

    return this.http
      .get<Product[]>(`${environment.apiUrl}/products/category/${category}`)
      .pipe(
        switchMap((products) => {
          this.loadingSubject.next(false); // Stop loading once products are fetched
          // Update the products subject
          return of(products);
        }),
        catchError(this.handleError),
        // Ensure loading is turned off after the operation completes or errors out
        finalize(() => this.loadingSubject.next(false))
      );
  }
}
