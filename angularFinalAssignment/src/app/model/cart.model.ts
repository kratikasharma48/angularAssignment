import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;
    private couponApplied: boolean = false;
    private couponDiscount: number = 0;
    public discountedTotalPrice : number = 0;
    public discountAmount : number = 0;

    addLine(product: Product, quantity: number = 1) {
        let line = this.lines.find(line => line.product.id == product.id);
        if (line != undefined) {
            line.quantity += quantity;    
        } else {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculate();
        if (this.couponApplied) {
            this.applyCoupon(10);
        }
    }

    updateQuantity(product: Product, quantity: number) {
        let line = this.lines.find(line => line.product.id == product.id);
        if (line != undefined) {
            line.quantity = Number(quantity);
        }
        this.recalculate();
        if (this.couponApplied) {
            this.applyCoupon(10);
        }
    }

    removeLine(id: number) {
        let index = this.lines.findIndex(line => line.product.id == id);
        this.lines.splice(index, 1);
        this.recalculate();
        if (this.couponApplied) {
            this.applyCoupon(10);
        }
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }
    applyCoupon(couponValue: number) {
        this.couponApplied = true;
        this.couponDiscount = this.cartPrice - (this.cartPrice *(10/100));
        this.discountAmount =  this.cartPrice *(10/100);
        this.recalculate();
    }
    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += l.lineTotal;
        })
        if (this.couponApplied) {
            this.discountedTotalPrice = this.couponDiscount;
            this.discountAmount;
        }
    }
}

export class CartLine {
    
    constructor(public product: Product,
        public quantity: number) {}

    get lineTotal() {
        return this.quantity * (this.product.price ?? 0);
    }
}
