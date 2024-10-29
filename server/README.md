# Gift Shop Server

Node.js + Express бэкенд для Telegram Mini App магазина подарков.

## 🏗 Структура проекта

```
src/
├── modules/                # Модули приложения
│   ├── auth/              # Аутентификация
│   ├── gifts/             # Управление подарками
│   ├── payment/           # Платежная система
│   ├── telegram/          # Интеграция с Telegram
│   └── users/             # Управление пользователями
├── config/                # Конфигурация
└── app.ts                # Основной файл приложения
```

## 🚀 Запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте .env файл:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/giftshop
BOT_TOKEN=your_bot_token
CRYPTO_PAY_API_TOKEN=your_crypto_pay_token
JWT_SECRET=your_jwt_secret
```

3. Запустите сервер:
```bash
npm run dev
```

## 📦 Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Компиляция TypeScript
- `npm run start` - Запуск собранного приложения

## 🛠 Технологии

- Node.js + TypeScript
- Express
- MongoDB + Mongoose
- JWT для аутентификации
- Crypto Pay API
- Grammy для работы с Telegram Bot API 