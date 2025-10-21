# Appril

> In-App Purchases meet Web3. A platform for NFT-based memberships and subscriptions for mobile apps, featuring dedicated portals for both users and developers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/louk/appril-1)

## About The Project

Appril is a revolutionary platform that bridges the gap between mobile applications and Web3, enabling NFT-based memberships and subscriptions. It features two distinct portals: a User Portal for discovering, purchasing, and trading app memberships, and a Developer Portal for creating, managing, and analyzing token-gated products.

The platform aims to provide a trustworthy, modern, and developer-friendly alternative to traditional in-app payment systems, giving users true ownership of their digital assets and developers new revenue streams.

## Key Features

### User Portal
*   **App Storefront**: Discover and explore apps offering NFT-based memberships.
*   **Powerful Filtering**: Search apps by category, price, blockchain, and more.
*   **App Detail Pages**: View comprehensive information about each app and its available products.
*   **Secondary Market**: Buy and sell memberships from other users.
*   **Account Management**: Manage your profile, purchase history, and active memberships.

### Developer Portal
*   **Analytics Dashboard**: Track key metrics like sales, active members, and revenue.
*   **Project Management**: Create and manage your app projects.
*   **Product Creation**: Define membership tiers, pricing, supply, and benefits.
*   **Team Management**: Invite and manage team members with role-based access.
*   **API & SDKs**: Integrate Appril into your mobile apps with comprehensive documentation.

## Technology Stack

This project is a full-stack monorepo built with a modern, serverless-first architecture.

*   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
*   **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/), [Hono](https://hono.dev/)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
*   **Database**: [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Package Manager**: [Bun](https://bun.sh/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/docs/installation) (v1.0 or higher)
*   A [Cloudflare account](https://dash.cloudflare.com/sign-up)
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/appril.git
    cd appril
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Local Development

To start the development server, which includes both the Vite frontend and the Hono backend worker, run:

```sh
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will hot-reload on changes, and the worker will restart automatically.

## Project Structure

The codebase is organized into three main directories:

*   `src/`: Contains the React frontend application, including pages, components, hooks, and utility functions.
*   `worker/`: Contains the Cloudflare Worker backend code, built with Hono. This is where API routes and business logic reside.
*   `shared/`: Contains TypeScript types and interfaces that are shared between the frontend and backend to ensure type safety.

## Development Guide

### Backend (Cloudflare Worker)

*   API endpoints are defined in `worker/user-routes.ts`.
*   Data persistence is handled by entities in `worker/entities.ts`, which abstract interactions with a single global Durable Object.
*   To add a new API endpoint, define a new route in `user-routes.ts` using Hono's routing syntax.

### Frontend (React)

*   Pages are located in `src/pages/`. Create new files here for new application views.
*   Reusable components are in `src/components/`. Leverage the pre-installed `shadcn/ui` components from `src/components/ui/`.
*   API calls are made using the helper function in `src/lib/api-client.ts`.

### Shared Types

To maintain type safety across the stack, define all data structures in `shared/types.ts`. These types can be imported into both the frontend and backend code.

## Deployment

This application is designed for seamless deployment to Cloudflare's global network.

1.  **Build the application:**
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    ```sh
    bun run deploy
    ```

This command will build the Vite frontend, bundle the worker code, and deploy the entire application using Wrangler.

Alternatively, deploy directly from your GitHub repository:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/louk/appril-1)

## License

Distributed under the MIT License. See `LICENSE` for more information.