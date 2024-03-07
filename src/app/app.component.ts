import { CartService } from './checkout/cart.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from './checkout/components/cart-sidebar/cart-sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ss-root',
  standalone: true,
  imports: [RouterOutlet, CartSidebarComponent, MatSidenavModule, AsyncPipe],

  template: `
    <mat-drawer-container class="h-full" autosize>
      <mat-drawer
        #drawer
        mode="side"
        position="end"
        [opened]="cartService.sidebarVisible$ | async"
      >
        <ss-cart-sidebar></ss-cart-sidebar>
      </mat-drawer>
      <mat-drawer-content class="h-full">
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [],
})
export class AppComponent {
  cartService = inject(CartService);
}
