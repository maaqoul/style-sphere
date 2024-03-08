import { HomeHeaderComponent } from './../home-header/home-header.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListingComponent } from '../../../products/containers/product-listing/product-listing.component';
import { CategoryManagerComponent } from '../../containers/category-manager/category-manager.component';

import { AsyncPipe } from '@angular/common';
import { SearchFormComponent } from '../../../search/containers/search-form/search-form.component';

@Component({
  selector: 'ss-home-page',
  standalone: true,
  imports: [
    CategoryManagerComponent,
    ProductListingComponent,
    HomeHeaderComponent,
    SearchFormComponent,
    AsyncPipe,
  ],
  template: `
    <div class="container mx-auto px-4 py-12 h-full">
      <ss-home-header>
        <ss-search-form />
      </ss-home-header>
      <ss-category-manager (categorySelected)="onCategorySelected($event)" />
      <ss-product-listing [category]="selectedCategory" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  selectedCategory: string = '';

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
}
