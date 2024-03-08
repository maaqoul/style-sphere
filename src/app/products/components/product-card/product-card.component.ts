import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Product } from './../../models/product.model';
import { CartService } from '../../../checkout/cart.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'ss-product-card',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule],
  template: `
    <article
      class="flex flex-col justify-between rounded-lg overflow-hidden shadow-lg min-h-[24rem] border border-gray-500 border-opacity-50 p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
      (click)="openProductDetails(product)"
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
          (click)="addToCart($event, product)"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private readonly cartService = inject(CartService);
  private readonly dialog = inject(MatDialog);

  addToCart(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  openProductDetails(product: Product): void {
    this.dialog.open(ProductDetailsComponent, {
      data: { product },
      width: '800px',
      maxWidth: '90vw',
    });
  }
}
