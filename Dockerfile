# Stage 1: Abhängigkeiten installieren
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* werden beim Build ins Bundle eingesetzt – nur zur Laufzeit
# gesetzt kommen sie nie im Browser an. Werte stehen in .env (docker compose).
ARG NEXT_PUBLIC_SITE_URL=https://lindermedia.de
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_NOINDEX=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_NOINDEX=$NEXT_PUBLIC_NOINDEX
RUN npm run build

# Stage 3: Produktions-Image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
