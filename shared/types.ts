export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type AppBadge = "New" | "Trending" | "On Sale" | "Featured";
export interface App {
  id: string; // UUID
  name: string;
  slug: string;
  iconUrl: string;
  category: string;
  description: string;
  developerId: string;
  storeLinks: {
    ios?: string;
    android?: string;
  };
  badges: AppBadge[];
  createdAt: string; // ISO 8601
}
export interface Product {
  id: string; // UUID
  appId: string;
  name: string;
  durationDays: number; // 30, 90, 365, -1 for lifetime
  price: {
    amount: number;
    currency: "USD";
  };
  supply: {
    cap: number | null; // null for unlimited
    remaining: number | null;
  };
  benefits: string[];
  royaltyBps: number; // Basis points for secondary sales
  visibility: "public" | "private" | "upcoming";
  createdAt: string; // ISO 8601
}
export interface Developer {
  id: string; // UUID
  orgName: string;
  country: string;
  site: string;
  logoUrl: string;
  appCount: number;
  createdAt: string; // ISO 8601
}
export interface User {
  id: string; // UUID
  email?: string;
  wallets: string[];
  profile: {
    name?: string;
    avatar?: string;
  };
  createdAt: string; // ISO 8601
}
export interface TeamMember {
  id: string; // UUID
  name?: string;
  email: string;
  role: "owner" | "admin" | "developer" | "finance" | "support";
  status: "invited" | "active";
  createdAt: string; // ISO 8601
}
export interface Coupon {
  id: string; // UUID
  code: string;
  type: "percent" | "fixed";
  value: number;
  maxUses: number | null;
  validFrom: string | null; // ISO 8601
  validTo: string | null; // ISO 8601
  eligibleProductIds: string[];
  createdAt: string; // ISO 8601
}
export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  appId: string;
  appName: string;
  appIconUrl: string;
  productName: string;
  expiresAt: string | null; // ISO string or null for lifetime
  createdAt: string; // ISO string
}
export interface Payment {
  id: string; // transaction id
  userId: string;
  productId: string;
  appName: string;
  productName: string;
  amount: {
    amount: number;
    currency: "USD" | "USDC" | "ETH";
  };
  txHash: string;
  createdAt: string; // ISO string
}
export interface Listing {
  id: string;
  productId: string;
  tokenId: string;
  seller: string; // wallet address
  price: {
    amount: number;
    currency: "USDC" | "USDT";
  };
  expiresAt: string | null; // ISO string, null for lifetime
  status: "active" | "sold" | "cancelled";
  // Denormalized data for easy display
  appName: string;
  appIconUrl: string;
  productName: string;
}