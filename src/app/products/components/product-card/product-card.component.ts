import { CurrencyPipe } from '@angular/common';
import { Product } from './../../models/product.model';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ss-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <article class="border rounded-lg overflow-hidden shadow-lg">
      <img
        [src]="product.image"
        [alt]="product.title"
        class="object-cover w-full h-48"
        loading="lazy"
      />
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ product.title }}</h3>
        <p class="text-gray-500">{{ product.price | currency }}</p>
        <p class="mt-2 text-sm text-gray-700">{{ product.description }}</p>
      </div>
    </article>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
