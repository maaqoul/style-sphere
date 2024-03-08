import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { CartService } from '../../cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ss-cart-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    AsyncPipe,
  ],
  template: `
    <div class="p-4">
      @if((cartItems$ | async)?.length) {
      <h2>Your Cart</h2>
      @for(item of cartItems$ | async; track item.product.id) {
      <div>
        <mat-card>
          <mat-card-header>
            <div mat-card-avatar><mat-icon>shopping_cart</mat-icon></div>
            <mat-card-title>{{ item.product.title }}</mat-card-title>
            <mat-card-subtitle>{{ item.product.price }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            Quantity: {{ item.quantity }}
            <button
              [disabled]="item.quantity === 1"
              mat-icon-button
              (click)="adjustQuantity(item.product.id, item.quantity - 1)"
            >
              <mat-icon>remove</mat-icon>
            </button>
            <button
              mat-icon-button
              (click)="adjustQuantity(item.product.id, item.quantity + 1)"
            >
              <mat-icon>add</mat-icon>
            </button>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="removeFromCart(item.product.id)">
              Remove
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
      } } @else {
      <div
        class="flex flex-col items-center justify-center min-w-[300px] min-h-[200px]"
      >
        <p class="text-lg font-semibold text-green-600">Your cart is empty.</p>
        <p class="text-sm text-green-700">Why not add something?</p>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class CartSidebarComponent {
  private readonly cartService = inject(CartService);
  cartItems$ = this.cartService.cartItems$;

  adjustQuantity(productId: number, quantity: number): void {
    this.cartService.adjustQuantity(productId, quantity);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
