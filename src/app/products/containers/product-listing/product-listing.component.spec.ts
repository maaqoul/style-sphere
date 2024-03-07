import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BehaviorSubject,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductListingComponent } from './product-listing.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardPlaceholderComponent } from '../../components/product-card-placeholder/product-card-placeholder.component';
import { MatCardModule } from '@angular/material/card';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { Product } from '../../models/product.model';

// Mock data
const mockProducts = [
  { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
  { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
];

// Mock ProductService
class MockProductService {
  private categorySubject = new BehaviorSubject<string>('all');
  loading$ = of(false);

  getProducts = jasmine
    .createSpy('getProducts')
    .and.returnValue(of(mockProducts));

  getProductsByCategory = jasmine
    .createSpy('getProductsByCategory')
    .and.callFake((category: string) =>
      this.categorySubject.asObservable().pipe(
        switchMap((cat) => (cat === category ? of(mockProducts) : of([]))),
        take(1)
      )
    );

  simulateCategoryChange(category: string) {
    this.categorySubject.next(category);
  }
}

fdescribe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListingComponent,
        ProductCardComponent,
        ProductCardPlaceholderComponent,
      ],
      providers: [{ provide: ProductService, useClass: MockProductService }],
      schemas: [NO_ERRORS_SCHEMA], // Use NO_ERRORS_SCHEMA to ignore unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products on init', () => {
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products$).toBeTruthy();
  });

  it('should update products when category changes', fakeAsync(() => {
    const mockProductService = TestBed.inject(
      ProductService
    ) as any as MockProductService;
    const newCategory = 'Electronics';

    component.category = newCategory; // Change category input

    // Directly simulate category change
    mockProductService.simulateCategoryChange(newCategory);

    tick(); // Advance virtual time for fakeAsync operations

    fixture.detectChanges(); // Trigger change detection manually

    expect(component.products$).toBeTruthy();

    // subscribe to products$ to verify the correct data is being emitted
    let products: Product[] | null = null;
    component.products$.subscribe((data) => {
      products = data;
    });
    tick(); // Ensure subscription receives the value
    expect(products).toEqual(mockProducts as any);
  }));
});
