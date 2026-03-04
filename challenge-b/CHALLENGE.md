# ⚡ Challenge B: Tối Ưu Pipeline CI/CD

## 🎯 Mục tiêu

Bạn nhận được một **Dockerfile + CI/CD pipeline hoạt động nhưng CHẬM & TỐN TÀI NGUYÊN**. Nhiệm vụ:
1. Tối ưu **Dockerfile** → image nhỏ nhất có thể
2. Tối ưu **pipeline CI/CD** → build nhanh nhất có thể
3. Giữ nguyên chức năng app (mọi endpoint vẫn hoạt động)

---

## 📁 Files có sẵn (KHÔNG cần copy gì thêm)

```
challenge-b/
├── src/index.js                      ← Source code (KHÔNG SỬA)
├── package.json
├── package-lock.json
├── .dockerignore
├── Dockerfile                        ← 🐌 TỐI ƯU FILE NÀY
├── .github/workflows/deploy.yml      ← 🐌 TỐI ƯU FILE NÀY
└── CHALLENGE.md                      ← Bạn đang đọc
```

---

## 📊 Benchmark — Mục Tiêu Tối Ưu

| Metric | Hiện tại (chậm) | Mục tiêu |
|--------|:-:|:-:|
| Docker image size | ~1GB | < 200MB ✅ |
| Số jobs trong pipeline | 3 (tuần tự) | 1 job ✅ |
| Docker layer cache | ❌ Không có | ✅ GHA cache |
| npm command | `npm install` | `npm ci` ✅ |
| Build+Push action | Thủ công | `build-push-action` ✅ |

---

## 🐌 5 Vấn Đề Cần Tối Ưu

### Vấn đề 1: Base Image Nặng (~1GB) 🏋️

### Vấn đề 2: Sai Thứ Tự COPY — Mất Cache 📦

### Vấn đề 3: `npm install` Không Tối Ưu 📥

### Vấn đề 4: 2 Jobs Tuần Tự — Lãng Phí 3x Checkout 🐢

### Vấn đề 5: Build Docker Thủ Công — Không Cache Between Runs 🔄

---

## 🧪 Cách Tự Test (LOCAL)

```bash
# Đo image size TRƯỚC
docker build -t challenge-b-old .
docker images challenge-b-old
# → ~1GB

# Sửa Dockerfile, đo LẠI
docker build -t challenge-b-new .
docker images challenge-b-new
# → Mục tiêu: < 200MB

# Đo build time
time docker build -t challenge-b-new .
# → Lần 2 phải nhanh hơn lần 1 (cache!)

# Test app vẫn chạy
docker run -d -p 3000:3000 --name test-b challenge-b-new
curl http://localhost:3000
# → {"message": "🐳 Hello from Docker Workshop!"}
docker stop test-b && docker rm test-b
```

**Pipeline test (cần GitHub repo):**
1. Tạo repo mới trên GitHub (hoặc dùng repo được cung cấp)
2. Push code: `git add . && git commit -m "optimize" && git push`
3. Mở GitHub → tab **Actions** → xem workflow đang chạy
4. So sánh thời gian pipeline trước/sau tối ưu
5. Kiểm tra Packages (sidebar) → Docker image đã push thành công

> ⚠️ Mỗi lần push = 3-5 phút đợi. Hãy **sửa hết rồi push 1 lần** thay vì push nhiều lần!

