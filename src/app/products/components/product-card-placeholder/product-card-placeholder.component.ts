import { Component } from '@angular/core';

@Component({
  selector: 'ss-product-card-placeholder',
  standalone: true,
  imports: [],
  template: `
    @for(item of items; track item) {
    <div class="animate-pulse flex space-x-4">
      <div class="squared-full bg-gray-700 h-24 w-24"></div>
      <div class="flex-1 space-y-4 py-1">
        <div class="h-4 bg-gray-500 rounded w-3/4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-500 rounded"></div>
          <div class="h-4 bg-gray-500 rounded w-5/6"></div>
        </div>
      </div>
    </div>
    }
  `,
  styles: ``,
})
export class ProductCardPlaceholderComponent {
  items = Array.from({ length: 20 }, (_, i) => i + 1);
}
