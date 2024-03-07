import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { Product } from './../../models/product.model';
import { CartService } from '../../../checkout/cart.service';

@Component({
  selector: 'ss-product-card',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule],
  template: `
    <article
      class="flex flex-col justify-between rounded-lg overflow-hidden shadow-lg min-h-[24rem] border border-gray-500 border-opacity-50 p-4"
    >
      <img
        [src]="product.image"
        [alt]="product.title"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
      <div class="flex flex-col flex-1 justify-end">
        <h3 class="text-lg font-semibold text-white mb-4">
          {{ product.title }}
        </h3>
        <p class="text-green-400 mb-4">{{ product.price | currency }}</p>
        <button
          mat-raised-button
          color="primary"
          class="align-self-start mb-2  "
          (click)="addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  cartService = inject(CartService);

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
