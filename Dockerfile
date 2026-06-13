FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable pnpm && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm && corepack prepare pnpm@9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DB_USER=placeholder
ENV DB_PASSWORD=placeholder
ENV DB_NAME=placeholder
ENV DB_HOST=placeholder
ENV DB_PORT=5432
ENV ACCESS_TOKEN_SECRET=placeholder_value_at_least_thirty_two_characters_long
ENV REFRESHTOKENSECRET=placeholder_value_at_least_thirty_two_characters_long
ENV DB_ROUNDS=12
ENV PGPOOL_MAX=10
ENV PGPOOL_TIMEOUT=30000
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs
EXPOSE 3000
CMD [ "node","server.js" ]