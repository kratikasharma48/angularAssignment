import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { CouponRepository } from "../model/coupon.repsitory";

@Component({
  templateUrl: "cartDetail.component.html",
})
export class CartDetailComponent {
  public discountPercent: number = 0;
  public discountRemaining: boolean = false;

  constructor(public cart: Cart, public coupon: CouponRepository) {
    this.discountPercent = this.coupon.getCoupon();
    
    if (this.discountPercent == 0) {
      this.discountRemaining = true;
    }
  }

  applyCouponEnable(cat: number) {
    this.cart.applyCoupon(10);
  }
}
