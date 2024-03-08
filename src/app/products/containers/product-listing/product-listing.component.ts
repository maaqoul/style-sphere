import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardPlaceholderComponent } from '../../components/product-card-placeholder/product-card-placeholder.component';

@Component({
  selector: 'ss-product-listing',
  standalone: true,
  imports: [
    MatCardModule,
    AsyncPipe,
    ProductCardComponent,
    ProductCardPlaceholderComponent,
  ],
  template: `<section
    aria-labelledby="products-heading"
    class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12"
  >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 h-full"
    >
      @if(!(loading$ | async)&& (products$ | async )) { @for(product of
      (products$ | async); track product.id) {
      <ss-product-card [product]="product" />
      } } @else { @for(item of items; track item) {
      <ss-product-card-placeholder />
      } }
    </div>
  </section> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListingComponent {
  @Input() category!: string;

  readonly items = Array.from({ length: 20 }, (_, i) => i + 1); // dummy array for the loader skeleton

  private readonly productService: ProductService = inject(ProductService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  products$!: Observable<Product[] | null>;
  loading$: Observable<boolean> = this.productService.loading$;

  ngOnInit() {
    this.loadAllProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'].currentValue !== 'all') {
      this.loadProductsByCategory(this.category);
    } else {
      this.loadAllProducts();
    }

    // if there is a search query
    combineLatest([
      this.productService.searchQuery$,
      this.productService.getProducts(),
    ])
      .pipe(
        map(([searchQuery, products]) => {
          if (!searchQuery || searchQuery.trim() === '') {
            return products;
          }
          return products?.filter(
            ({ title, description }) =>
              title.toLowerCase().includes(searchQuery) ||
              description.toLowerCase().includes(searchQuery)
          );
        })
      )
      .subscribe((filteredProducts) => {
        if (filteredProducts) {
          this.products$ = of(filteredProducts);
          this.cdr.markForCheck();
        }
      });
  }

  loadAllProducts() {
    this.products$ = this.productService.getProducts();
  }

  loadProductsByCategory(category: string) {
    this.products$ = this.loading$.pipe(
      take(1),
      switchMap((_) => this.productService.getProductsByCategory(category)),
      catchError(() => of(null))
    );
  }
}
