import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CartService } from '../../../checkout/cart.service';

@Component({
  selector: 'ss-home-header',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <header class="flex justify-between items-center p-4 sticky">
      <h1 class="text-center text-4xl font-bold mb-8">Style Sphere</h1>

      <!-- Slot for content projection -->
      <ng-container>
        <ng-content></ng-content>
      </ng-container>

      <button class="relative" (click)="toggleCart()">
        <span class="material-icons">shopping_cart</span>
        <span
          class="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
          >{{ totalItems$ | async }}</span
        >
      </button>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  cartService = inject(CartService);
  totalItems$ = this.cartService.totalItems$;

  toggleCart() {
    this.cartService.toggleSidebar();
  }
}
