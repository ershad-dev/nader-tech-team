├── pages/                      # 🗺️ مرکز آدرس‌دهی محض سایت (Skinny Pages) - فقط برای فراخوانی
│   ├── index.vue               # فقط کامپوننت‌های Home را صدا می‌زند ➔ /
│   ├── about.vue               # فقط کامپوننت‌های About را صدا می‌زند ➔ /about
│   ├── order.vue               # فقط کامپوننت‌های مربوط به سفارش را صدا می‌زند ➔ /order
│   │
│   ├── auth/                   # مسیرهای احراز هویت (فقط فراخوانی کامپوننت‌های پوشه auth)
│   │   ├── login.vue           # صفحه ورود ➔ /auth/login
│   │   ├── register.vue        # صفحه ثبت‌نام ➔ /auth/register
│   │   ├── forgot-password.vue # فراموشی رمز عبور ➔ /auth/forgot-password
│   │   └── verify.vue          # وارد کردن کد پیامک ➔ /auth/verify
│   │
│   ├── profile/                # پنل کاربری لندینگ
│   │   └── index.vue           # صفحه مشخصات کاربر ➔ /profile
│   │
│   ├── events/                 # مسیرهای بخش ایونت و قرعه‌کشی (مخصوص ساب‌دومین)
│   │   ├── index.vue           # خدمات ایونت ➔ /events
│   │   ├── checkout.vue        # صفحه پرداخت ➔ /events/checkout
│   │   ├── receipt.vue         # رسید و بلیط ➔ /events/receipt
│   │   └── live-lottery.vue    # صفحه انتظار قرعه‌کشی ➔ /events/live-lottery
│   │
│   └── admin/                  # مسیرهای پنل مدیریت ادمین
│       ├── index.vue           # لاگین ادمین ➔ /admin
│       ├── dashboard.vue       # داشبورد اصلی ➔ /admin/dashboard
│       ├── users.vue           # لیست کاربران ➔ /admin/users
│       ├── banners.vue         # مدیریت بنرها ➔ /admin/banners
│       ├── requests.vue        # مدیریت درخواست‌ها ➔ /admin/requests
│       └── lottery-control.vue # کنترل قرعه‌کشی ➔ /admin/lottery-control
