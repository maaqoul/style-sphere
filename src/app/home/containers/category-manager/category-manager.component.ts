import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'ss-category-manager',
  standalone: true,
  imports: [MatSelectModule, AsyncPipe],
  template: `
    <div class="mt-4">
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Choose a category</mat-label>
        <mat-select
          [(value)]="selectedCategory"
          (selectionChange)="onCategorySelected($event.value)"
        >
          <mat-option value="all" [disabled]="selectedCategory === 'all'">
            all
          </mat-option>
          @for(category of (categories$ | async); track category) {
          <mat-option
            [value]="category"
            [disabled]="selectedCategory === category"
          >
            {{ category }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryManagerComponent {
  categories$: Observable<string[]>;
  selectedCategory: string;

  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productService: ProductService) {
    this.categories$ = this.productService.getCategories();
    this.selectedCategory = '';
  }

  onCategorySelected(category: string): void {
    this.categorySelected.emit(category);
  }
}
