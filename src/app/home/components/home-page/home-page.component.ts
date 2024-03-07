import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListingComponent } from '../../../products/containers/product-listing/product-listing.component';
import { CategoryManagerComponent } from '../../containers/category-manager/category-manager.component';

@Component({
  selector: 'ss-home-page',
  standalone: true,
  imports: [CategoryManagerComponent, ProductListingComponent],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-center text-4xl font-bold mb-8">Style Sphere</h1>
      <ss-category-manager (categorySelected)="onCategorySelected($event)" />
      <ss-product-listing [category]="selectedCategory" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  selectedCategory: string = '';

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
}
