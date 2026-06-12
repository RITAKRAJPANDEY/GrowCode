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
ENV ACCESS_TOKEN_SECRET=placeholder
ENV REFRESHTOKENSECRET=placeholder
ENV SALT_ROUNDS=placeholder

RUN pnpm run build

RUN pnpm prune --prod

FROM node:20-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/public ./public

USER nextjs
EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]