import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProductListingComponent } from '../../../products/containers/product-listing/product-listing.component';
import { CategoryManagerComponent } from '../../containers/category-manager/category-manager.component';
import { CartService } from '../../../checkout/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ss-home-page',
  standalone: true,
  imports: [CategoryManagerComponent, ProductListingComponent, AsyncPipe],
  template: `
    <div class="container mx-auto px-4 py-12 h-full">
      <header class="flex justify-between items-center p-4">
        <h1 class="text-center text-4xl font-bold mb-8">Style Sphere</h1>

        <button class="relative" (click)="toggleCart()">
          <span class="material-icons">shopping_cart</span>
          <span
            class="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >{{ totalItems$ | async }}</span
          >
        </button>
      </header>
      <ss-category-manager (categorySelected)="onCategorySelected($event)" />
      <ss-product-listing [category]="selectedCategory" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  cartService = inject(CartService);
  quantity!: number;
  selectedCategory: string = '';

  totalItems$ = this.cartService.totalItems$;

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }

  toggleCart() {
    this.cartService.toggleSidebar();
  }
}
