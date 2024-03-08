// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../products/models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  public cartItems$ = this.cartSubject.asObservable();

  private sidebarVisible = new BehaviorSubject<boolean>(false);
  public sidebarVisible$ = this.sidebarVisible.asObservable();

  totalItems$ = this.cartItems$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  toggleSidebar() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  addToCart(product: Product): void {
    const currentItems = this.cartSubject.value;
    const foundIndex = currentItems.findIndex(
      (item) => item.product.id === product.id
    );
    if (foundIndex !== -1) {
      currentItems[foundIndex].quantity++;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.cartSubject.next(currentItems);
    this.saveCart(currentItems);
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.cartSubject.value.filter(
      (item) => item.product.id !== productId
    );
    this.cartSubject.next(updatedItems);
    this.saveCart(updatedItems);
  }

  adjustQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartSubject.value;
    const foundItem = currentItems.find(
      (item) => item.product.id === productId
    );
    if (foundItem && quantity > 0) {
      foundItem.quantity = quantity;
    } else {
      this.removeFromCart(productId);
    }
    this.cartSubject.next(currentItems);
    this.saveCart(currentItems);
  }
}
