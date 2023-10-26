import { Injectable } from "@angular/core";
@Injectable()
export class CouponRepository {
  private couponNumbers: number = 0;

  setCoupon(couponNumber: number) {
    this.couponNumbers = couponNumber;
  }

  getCoupon() {
    return this.couponNumbers;
  }
}
