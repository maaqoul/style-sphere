import { Component } from '@angular/core';

@Component({
  selector: 'ss-product-card-placeholder',
  standalone: true,
  template: `
    <article
      class="border rounded-lg overflow-hidden shadow-lg min-h-[24rem] bg-gray-200 animate-pulse"
    >
      <div class="h-48 bg-gray-300"></div>
      <!-- Image placeholder -->
      <div class="p-4 space-y-3">
        <div class="h-6 bg-gray-300 rounded"></div>
        <!-- Title placeholder -->
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        <!-- Price placeholder -->
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <!-- Description line 1 placeholder -->
        <div class="h-4 bg-gray-300 rounded w-[80%]"></div>
        <!-- Description line 2 placeholder -->
        <div class="h-10 bg-gray-300 rounded w-1/4 mt-4"></div>
        <!-- Button placeholder -->
      </div>
    </article>
  `,
})
export class ProductCardPlaceholderComponent {}
