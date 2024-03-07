/***
 * for some reason not all tailwindcss classes work that's why I worked with styles here
 */
import { Component, Inject, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { Product } from './../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from './../../../checkout/cart.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ss-product-details',
  standalone: true,
  imports: [CurrencyPipe, MatDialogModule, MatIconModule, MatButtonModule],
  template: `
    <mat-dialog-content class="custom-dialog-container w-full">
      <button mat-icon-button class="custom-close" (click)="closeDialog()">
        <mat-icon>close</mat-icon>
      </button>

      <!-- Product Image -->
      <img
        [src]="data.product.image"
        [alt]="data.product.title"
        class="w-full object-contain"
        style="max-height: 400px;"
        loading="lazy"
      />

      <!-- Scrollable Description -->
      <div class="mt-4" style="max-height: 200px; overflow-y: auto;">
        <h2 class="text-lg font-semibold text-center">
          {{ data.product.title }}
        </h2>
        <p class="text-green-500 text-center">
          {{ data.product.price | currency }}
        </p>
        <p>{{ data.product.description }}</p>
      </div>

      <div class="text-center mt-4">
        <button
          mat-raised-button
          color="primary"
          (click)="addToCart(data.product)"
        >
          Add to Cart
        </button>
      </div>
    </mat-dialog-content>
  `,
  styles: `
  .custom-dialog-container {
    position: relative;
  }

  .custom-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }`,
})
export class ProductDetailsComponent {
  private readonly dialogRef = inject(MatDialogRef<ProductDetailsComponent>);
  private readonly cartService = inject(CartService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product }) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
