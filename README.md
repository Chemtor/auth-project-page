# auth-project-page

## Structure Project

```
project/
│
├── models/
│ └── User.js # Schema và model cho người dùng
│
├── controllers/
│ ├── authController.js # Xử lý đăng ký, đăng nhập
│ └── userController.js # Xử lý các request liên quan đến người dùng
│
├── middleware/
│ ├── authMiddleware.js # Middleware xác thực JWT
│ └── roleMiddleware.js # Middleware phân quyền
│
├── routes/
│ ├── authRoutes.js # Route cho đăng ký, đăng nhập
│ └── userRoutes.js # Route cho quản lý người dùng
│
├── utils/
│ ├── generateToken.js # Hàm tạo JWT
│ └── sendEmail.js # Hàm gửi email
│
├── config/
│ └── db.js # Kết nối database
│
└── app.js # File chính để khởi động ứng dụng
```
