import { CouponRepository } from './../model/coupon.repsitory';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'coupon',
  templateUrl: 'coupon.component.html',
})
export class CouponComponent {
  constructor(
    private router:Router,
    private coupon: CouponRepository
  ) {}
  applyCoupon(){
    this.coupon.setCoupon(10);
    this.router.navigateByUrl("/store");
  }
}