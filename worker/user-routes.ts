import { Hono } from "hono";
import type { Env } from './core-utils';
import { AppEntity, ProductEntity, TeamMemberEntity, CouponEntity, PurchaseEntity, PaymentEntity, DeveloperEntity } from "./entities";
import { ok, bad, isStr, notFound } from './core-utils';
import type { App, Product, TeamMember, Coupon, Purchase, Payment, Developer, User, AppBadge, Listing } from "@shared/types";
// --- MOCK DATA GENERATION FOR SEEDING ---
async function seedDatabase(env: Env) {
  console.log("Seeding database with mock data...");
  const MOCK_APP_COUNT = 100;
  const MOCK_DEV_COUNT = 20;
  const appNameParts1 = ["Quantum", "Pixel", "Zenith", "Nova", "Aura", "Echo", "Stellar", "Orion", "Pulse", "Vertex"];
  const appNameParts2 = ["Leap", "Flow", "Drive", "Shift", "Sync", "Forge", "Wave", "Craft", "Base", "Hub"];
  const categories = ["Photo & Video", "Finance", "Developer Tools", "Music", "Health & Fitness", "Productivity", "Travel", "Lifestyle", "AI", "Web3"];
  const badges: AppBadge[] = ["New", "Trending", "On Sale", "Featured"];
  const countries = ["USA", "Germany", "Japan", "Canada", "UK", "France", "Australia"];
  const getRandomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomSubset = <T>(arr: T[], max = 3) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * (max + 1)));
  };
  const mockDevelopers: Developer[] = Array.from({ length: MOCK_DEV_COUNT }, (_, i) => {
    const id = `dev-${i + 1}`;
    return {
      id,
      orgName: `${getRandomItem(appNameParts1)}${getRandomItem(appNameParts2)} Studios`,
      logoUrl: `https://picsum.photos/seed/dev${i + 1}/128/128`,
      country: getRandomItem(countries),
      appCount: 0,
      site: "https://example.com",
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
  const mockApps: App[] = Array.from({ length: MOCK_APP_COUNT }, (_, i) => {
    const name = `${getRandomItem(appNameParts1)} ${getRandomItem(appNameParts2)}`;
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`;
    const dev = getRandomItem(mockDevelopers);
    dev.appCount++;
    return {
      id: `app-${i + 1}`,
      name,
      slug,
      iconUrl: `https://picsum.photos/seed/app${i + 1}/128/128`,
      category: getRandomItem(categories),
      description: `A revolutionary app for ${getRandomItem(categories).toLowerCase()} that helps you manage your daily tasks with ease and efficiency.`,
      developerId: dev.id,
      storeLinks: {},
      badges: getRandomSubset(badges),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
  await Promise.all(mockDevelopers.map(dev => DeveloperEntity.create(env, dev)));
  await Promise.all(mockApps.map(app => AppEntity.create(env, app)));
  console.log("Database seeded successfully.");
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // --- APPS ---
  app.get('/api/apps', async (c) => {
    let page = await AppEntity.list(c.env);
    if (page.items.length === 0) {
      await seedDatabase(c.env);
      page = await AppEntity.list(c.env);
    }
    return ok(c, page);
  });
  app.get('/api/apps/:id', async (c) => {
    const { id } = c.req.param();
    const app = await AppEntity.get(c.env, id);
    if (!app) return notFound(c, 'App not found');
    return ok(c, app);
  });
  app.post('/api/apps', async (c) => {
    const body = await c.req.json<Partial<App>>();
    if (!isStr(body.name) || !isStr(body.category) || !isStr(body.developerId)) {
      return bad(c, 'name, category, and developerId are required');
    }
    const slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const newApp: App = {
      id: crypto.randomUUID(),
      name: body.name,
      slug: `${slug}-${crypto.randomUUID().slice(0, 4)}`,
      iconUrl: body.iconUrl || `https://picsum.photos/seed/${Math.random()}/128/128`,
      category: body.category,
      description: body.description || "",
      developerId: body.developerId,
      storeLinks: body.storeLinks || {},
      badges: body.badges || [],
      createdAt: new Date().toISOString(),
    };
    const created = await AppEntity.create(c.env, newApp);
    return ok(c, created);
  });
  // --- PRODUCTS ---
  app.get('/api/products', async (c) => {
    const appId = c.req.query('appId');
    const page = await ProductEntity.list(c.env);
    if (appId) {
      page.items = page.items.filter(p => p.appId === appId);
    }
    return ok(c, page);
  });
  app.post('/api/products', async (c) => {
    const body = await c.req.json<Partial<Product>>();
    if (!isStr(body.appId) || !isStr(body.name) || typeof body.durationDays !== 'number' || !body.price) {
      return bad(c, 'appId, name, durationDays, and price are required');
    }
    const newProduct: Product = {
      id: crypto.randomUUID(),
      appId: body.appId,
      name: body.name,
      durationDays: body.durationDays,
      price: body.price,
      supply: body.supply || { cap: null, remaining: null },
      benefits: body.benefits || [],
      royaltyBps: body.royaltyBps || 500, // 5% default
      visibility: body.visibility || 'private',
      createdAt: new Date().toISOString(),
    };
    const created = await ProductEntity.create(c.env, newProduct);
    return ok(c, created);
  });
  app.post('/api/products/:id/purchase', async (c) => {
    const { id: productId } = c.req.param();
    const { userId } = await c.req.json<{ userId: string }>();
    if (!userId) return bad(c, 'userId is required');
    const product = await ProductEntity.get(c.env, productId);
    if (!product) return notFound(c, 'Product not found');
    const app = await AppEntity.get(c.env, product.appId);
    if (!app) return notFound(c, 'Associated app not found');
    // Check supply
    if (product.supply.cap !== null && (product.supply.remaining === null || product.supply.remaining <= 0)) {
      return bad(c, 'This product is sold out.');
    }
    // Create Purchase Record
    const expiresAt = product.durationDays === -1 ? null : new Date(Date.now() + product.durationDays * 24 * 60 * 60 * 1000).toISOString();
    const newPurchase: Purchase = {
      id: crypto.randomUUID(),
      userId,
      productId,
      appId: app.id,
      appName: app.name,
      appIconUrl: app.iconUrl,
      productName: product.name,
      expiresAt,
      createdAt: new Date().toISOString(),
    };
    await PurchaseEntity.create(c.env, newPurchase);
    // Create Payment Record
    const newPayment: Payment = {
      id: crypto.randomUUID(),
      userId,
      productId,
      appName: app.name,
      productName: product.name,
      amount: product.price,
      txHash: `0x${crypto.randomUUID().replace(/-/g, '')}`,
      createdAt: new Date().toISOString(),
    };
    await PaymentEntity.create(c.env, newPayment);
    // Decrement supply if not unlimited
    if (product.supply.cap !== null && product.supply.remaining !== null) {
      const productInst = new ProductEntity(c.env, productId);
      await productInst.patch({
        supply: { ...product.supply, remaining: product.supply.remaining - 1 }
      });
    }
    return ok(c, { purchase: newPurchase, payment: newPayment });
  });
  // --- DEVELOPERS ---
  app.get('/api/developers', async (c) => {
    let page = await DeveloperEntity.list(c.env);
    if (page.items.length === 0) {
      await seedDatabase(c.env);
      page = await DeveloperEntity.list(c.env);
    }
    return ok(c, page);
  });
  app.get('/api/developers/:id', async (c) => {
    const { id } = c.req.param();
    const dev = await DeveloperEntity.get(c.env, id);
    if (!dev) return notFound(c, 'Developer not found');
    return ok(c, dev);
  });
  // --- TEAMS ---
  app.get('/api/teams', async (c) => {
    const page = await TeamMemberEntity.list(c.env);
    return ok(c, page);
  });
  app.post('/api/teams', async (c) => {
    const body = await c.req.json<{ email: string; role: TeamMember['role'] }>();
    if (!isStr(body.email) || !isStr(body.role)) {
      return bad(c, 'email and role are required');
    }
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      email: body.email,
      role: body.role,
      status: 'invited',
      createdAt: new Date().toISOString(),
    };
    const created = await TeamMemberEntity.create(c.env, newMember);
    return ok(c, created);
  });
  // --- COUPONS ---
  app.get('/api/coupons', async (c) => {
    const page = await CouponEntity.list(c.env);
    return ok(c, page);
  });
  app.post('/api/coupons', async (c) => {
    const body = await c.req.json<Partial<Coupon>>();
    if (!isStr(body.code) || !isStr(body.type) || typeof body.value !== 'number') {
      return bad(c, 'code, type, and value are required');
    }
    const newCoupon: Coupon = {
      id: crypto.randomUUID(),
      code: body.code,
      type: body.type,
      value: body.value,
      maxUses: body.maxUses || null,
      validFrom: body.validFrom || null,
      validTo: body.validTo || null,
      eligibleProductIds: body.eligibleProductIds || [],
      createdAt: new Date().toISOString(),
    };
    const created = await CouponEntity.create(c.env, newCoupon);
    return ok(c, created);
  });
  // --- DEV STATS ---
  app.get('/api/dev/stats', (c) => {
    const mockStats = [
      { title: "Total Sales", value: "$12,480.50", change: "+12.5% from last month", icon: "DollarSign" },
      { title: "Active Members", value: "832", change: "+201 since last week", icon: "Users" },
      { title: "Monthly Recurring Revenue", value: "$2,150.00", change: "-2.1% from last month", icon: "Activity" },
      { title: "New Members (30d)", value: "105", change: "+15.3% from last month", icon: "UserPlus" },
    ];
    return ok(c, mockStats);
  });
  // --- USER ACCOUNT ---
  const mockUser: User = {
    id: 'user_me',
    email: 'alex.doe@example.com',
    wallets: ['0x123...abc'],
    profile: {
      name: 'Alex Doe',
      avatar: 'https://i.pravatar.cc/150?u=alexdoe',
    },
    createdAt: new Date().toISOString(),
  };
  app.get('/api/users/me', (c) => {
    return ok(c, mockUser);
  });
  app.post('/api/users/me', async (c) => {
    const body = await c.req.json<{ name?: string; email?: string }>();
    if (body.name) mockUser.profile.name = body.name;
    if (body.email) mockUser.email = body.email;
    return ok(c, mockUser);
  });
  app.get('/api/users/me/purchases', async (c) => {
    const page = await PurchaseEntity.list(c.env);
    // In a real app, we'd filter by the authenticated user's ID
    const userPurchases = page.items.filter(p => p.userId === 'user_me');
    return ok(c, userPurchases);
  });
  app.get('/api/users/me/history', async (c) => {
    const page = await PaymentEntity.list(c.env);
    // In a real app, we'd filter by the authenticated user's ID
    const userHistory = page.items.filter(p => p.userId === 'user_me');
    return ok(c, userHistory);
  });
  // --- SECONDARY MARKET ---
  app.get('/api/market/listings', async (c) => {
    const appsPage = await AppEntity.list(c.env);
    const mockListings: Listing[] = Array.from({ length: 12 }, (_, i) => {
      const app = appsPage.items[Math.floor(Math.random() * appsPage.items.length)];
      const isLifetime = Math.random() > 0.8;
      return {
        id: `listing_${i + 1}`,
        productId: `prod_${i + 1}`,
        tokenId: `${Math.floor(Math.random() * 1000)}`,
        seller: `0x${crypto.randomUUID().replace(/-/g, '').slice(0, 40)}`,
        price: {
          amount: parseFloat((Math.random() * 50 + 2).toFixed(2)),
          currency: 'USDC',
        },
        expiresAt: isLifetime ? null : new Date(Date.now() + (Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        appName: app.name,
        appIconUrl: app.iconUrl,
        productName: isLifetime ? 'Lifetime Founder' : 'Pro Yearly',
      };
    });
    return ok(c, mockListings);
  });
}