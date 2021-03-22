import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayoneCreditcardComponent } from './payment-payone-creditcard.component';

describe('PaymentPayoneCreditcardComponent', () => {
  let component: PaymentPayoneCreditcardComponent;
  let fixture: ComponentFixture<PaymentPayoneCreditcardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentPayoneCreditcardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPayoneCreditcardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
