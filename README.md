# Hệ thống Quản lý Mầm non

Ứng dụng web hỗ trợ quản lý thông tin **học sinh, giáo viên, phụ huynh, lớp học và lịch học**.

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**

### Backend
- **Node.js**
- **Express**
- **Prisma ORM**
- **MySQL**
- **CORS**
- **dotenv**

---

## 📁 Cấu trúc dự án

```text
CodeDemo_CDIO3/
├── Backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── seed-classes.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       └── server.js
│
└── Frontend/
    └── fe-mamnon/
        ├── src/
        ├── public/
        ├── package.json
        └── vite.config.js
```

---

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository
```bash
git clone <repository-url>
cd CodeDemo_CDIO3
```

### 2. Khởi chạy Backend

Di chuyển vào thư mục `Backend` và cài đặt các thư viện:
```bash
cd Backend
npm install
```

Tạo file `.env` tại thư mục `Backend` và cấu hình kết nối cơ sở dữ liệu:
```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

Generate Prisma Client và chạy Migration:
```bash
npx prisma generate
npx prisma migrate dev
```

Chạy dữ liệu mẫu (Seed Data) nếu cần:
```bash
npx prisma db seed
```

Khởi chạy server:
```bash
npm run dev
# Hoặc: npm start
```

### 3. Khởi chạy Frontend

Mở terminal mới tại thư mục gốc của dự án:
```bash
cd Frontend/fe-mamnon
npm install
npm run dev
```

Sau khi chạy thành công, truy cập vào địa chỉ local được Vite hiển thị trên terminal (thường là `http://localhost:5173`).

---

## 🔧 Các lệnh thường dùng

### Backend

| Lệnh | Chức năng |
| :--- | :--- |
| `npm run dev` | Chạy server ở chế độ Development |
| `npm start` | Chạy server ở chế độ Production |
| `npx prisma generate` | Generate lại Prisma Client |
| `npx prisma migrate dev` | Chạy Database Migration |
| `npx prisma db seed` | Thêm dữ liệu mẫu vào cơ sở dữ liệu |

### Frontend

| Lệnh | Chức năng |
| :--- | :--- |
| `npm run dev` | Chạy Development server |
| `npm run build` | Build ứng dụng cho Production |
| `npm run preview` | Xem trước bản Build |
| `npm run lint` | Kiểm tra lỗi code với ESLint |

---

## 🏗️ Kiến trúc hệ thống

```text
React + Vite
     │
     │ Axios / REST API
     ▼
Node.js + Express
     │
     ▼
Prisma ORM
     │
     ▼
MySQL
```

Backend được tổ chức theo kiến trúc phân tầng (Layered Architecture):
- **Routes:** Định nghĩa các API endpoints.
- **Controllers:** Tiếp nhận request và trả về response.
- **Services:** Xử lý logic nghiệp vụ chính.
- **Prisma:** Tương tác và truy vấn cơ sở dữ liệu.

---


## 👥 Thành viên thực hiện (Coding)

| Thành viên | Vai trò |
| :--- | :--- |
| **Vũ Tuyết Nhi** | Frontend / Backend |
| **Hoàng Hồng Thái** | Backend |
