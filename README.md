# ReadEssay Platform (`readessay-redesign`)

Full-stack monorepo for **ReadEssay** (`readessay.com`), an academic writing and editorial assistance platform.

## Architecture & Monorepo Structure

* **`/frontend`** — Public-facing client storefront (Next.js) deployed at `readessay.com`
* **`/design`** — Internal editorial and administrative dashboard (Next.js) deployed at `admin.readessay.com`
* **`/backend`** — Core REST API, JWT cookie authentication, and Prisma ORM (NestJS + PostgreSQL) deployed at `api.readessay.com`
* **`/uploads`** — Persistent local/volume storage for client and editorial file attachments

## Deployment Pipeline

Hosted on a **Hostinger KVM 2 VPS (Ubuntu 24.04)** managed via **Coolify**.
* Pushing commits to `main` automatically triggers Coolify webhooks to rebuild and redeploy updated services with zero manual SSH intervention.