import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardPlaceholderComponent } from './product-card-placeholder.component';

describe('ProductCardPlaceholderComponent', () => {
  let component: ProductCardPlaceholderComponent;
  let fixture: ComponentFixture<ProductCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
