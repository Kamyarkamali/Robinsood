# # ---------- مرحله 1: Build ----------
# FROM node:22.19.0 AS builder
# RUN npm config set registry https://repo.hmirror.ir/npm

# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN rm .env

# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL
# RUN echo "VITE_API_URL=$VITE_API_URL"
# RUN npm run build
# # ---------- مرحله 2: Serve ----------
# FROM node:22.19.0-slim
# RUN npm config set registry https://repo.hmirror.ir/npm

# RUN npm install -g serve
# WORKDIR /app
# COPY --from=builder /app/dist ./dist

# EXPOSE 5500
# CMD ["serve", "-s", "dist", "-l", "5500", "--single"]

FROM node:22.19.0 AS builder
RUN npm config set registry https://repo.hmirror.ir/npm

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN rm .env

RUN npm run dev --port 5000