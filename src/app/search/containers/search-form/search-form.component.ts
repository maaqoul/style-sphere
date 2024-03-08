import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'ss-search-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  template: `
    <mat-form-field appearance="fill" class="w-full">
      <mat-label>Search Products</mat-label>
      <input
        matInput
        placeholder="Type to search..."
        (keyup)="search($event)"
      />
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
  `,
})
export class SearchFormComponent {
  private readonly productService = inject(ProductService);
  private readonly searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged() // Only emit if the current value is different than the last
      )
      .subscribe((searchTerm) => {
        this.applyFilter(searchTerm);
      });
  }

  search(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  applyFilter(searchTerm: string): void {
    this.productService.updateSearchQuery(searchTerm);
  }
}
