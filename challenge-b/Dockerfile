# ===================================================
# ✅ CHALLENGE B — Dockerfile ĐÃ TỐI ƯU
# ===================================================

FROM node:20-alpine

WORKDIR /app

# ✅ COPY package*.json TRƯỚC để tận dụng layer cache
COPY package*.json ./

# ✅ npm ci --omit=dev: nhanh hơn, bỏ devDependencies
RUN npm ci --omit=dev

# ✅ COPY source sau khi install (cache không bị vỡ khi đổi code)
COPY src/ ./src/

EXPOSE 3000

# ✅ Bonus: chạy với user node (không phải root)
USER node

CMD ["node", "src/index.js"]
