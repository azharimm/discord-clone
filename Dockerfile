# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Generate Prisma Client
FROM node:18-alpine AS prisma
WORKDIR /app
COPY --from=deps /app/package*.json ./
COPY prisma ./prisma/
#Copy the env file if needed for prisma generate
COPY .env ./.env 
RUN npm install prisma --save-dev
RUN npx prisma generate

# Stage 3: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma /app/node_modules/@prisma ./node_modules/@prisma
RUN npm run build

# Stage 4: Run the application
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
#copy env file for the application runtime.
COPY .env ./.env 
EXPOSE 3000
CMD ["npm", "start"]