import { IndexedEntity } from "./core-utils";
import type { App, Product, TeamMember, Coupon, Purchase, Payment, Developer } from "@shared/types";
// APP ENTITY
export class AppEntity extends IndexedEntity<App> {
  static readonly entityName = "app";
  static readonly indexName = "apps";
  static readonly initialState: App = {
    id: "",
    name: "",
    slug: "",
    iconUrl: "",
    category: "",
    description: "",
    developerId: "",
    storeLinks: {},
    badges: [],
    createdAt: "",
  };
}
// PRODUCT ENTITY
export class ProductEntity extends IndexedEntity<Product> {
  static readonly entityName = "product";
  static readonly indexName = "products";
  static readonly initialState: Product = {
    id: "",
    appId: "",
    name: "",
    durationDays: 0,
    price: { amount: 0, currency: "USD" },
    supply: { cap: null, remaining: null },
    benefits: [],
    royaltyBps: 0,
    visibility: "private",
    createdAt: "",
  };
}
// DEVELOPER ENTITY
export class DeveloperEntity extends IndexedEntity<Developer> {
  static readonly entityName = "developer";
  static readonly indexName = "developers";
  static readonly initialState: Developer = {
    id: "",
    orgName: "",
    country: "",
    site: "",
    logoUrl: "",
    appCount: 0,
    createdAt: "",
  };
}
// TEAM MEMBER ENTITY
export class TeamMemberEntity extends IndexedEntity<TeamMember> {
  static readonly entityName = "teamMember";
  static readonly indexName = "teamMembers";
  static readonly initialState: TeamMember = {
    id: "",
    email: "",
    role: "developer",
    status: "invited",
    createdAt: "",
  };
}
// COUPON ENTITY
export class CouponEntity extends IndexedEntity<Coupon> {
  static readonly entityName = "coupon";
  static readonly indexName = "coupons";
  static readonly initialState: Coupon = {
    id: "",
    code: "",
    type: "percent",
    value: 0,
    maxUses: null,
    validFrom: null,
    validTo: null,
    eligibleProductIds: [],
    createdAt: "",
  };
}
// PURCHASE ENTITY
export class PurchaseEntity extends IndexedEntity<Purchase> {
  static readonly entityName = "purchase";
  static readonly indexName = "purchases";
  static readonly initialState: Purchase = {
    id: "",
    userId: "",
    productId: "",
    appId: "",
    appName: "",
    appIconUrl: "",
    productName: "",
    expiresAt: null,
    createdAt: "",
  };
}
// PAYMENT ENTITY
export class PaymentEntity extends IndexedEntity<Payment> {
  static readonly entityName = "payment";
  static readonly indexName = "payments";
  static readonly initialState: Payment = {
    id: "",
    userId: "",
    productId: "",
    appName: "",
    productName: "",
    amount: { amount: 0, currency: "USD" },
    txHash: "",
    createdAt: "",
  };
}