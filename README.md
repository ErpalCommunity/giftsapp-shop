# Telegram Gift Shop

Telegram Mini App для покупки и отправки виртуальных подарков через Crypto Pay.

## 🌟 Особенности

- Покупка и отправка виртуальных подарков через Crypto Pay
- Интеграция с Telegram Mini App
- Поддержка светлой и темной темы
- Мультиязычность (RU/EN)
- Лидерборд пользователей
- Профили с историей подарков

## 🏗 Структура проекта

```
├── client/           # Vue.js клиентское приложение
├── server/           # Node.js + Express бэкенд
└── bot/             # Telegram бот на Grammy
```

## 🚀 Быстрый старт

1. Клонируйте репозиторий:
```bash
git clone https://github.com/username/telegram-gift-shop.git
```

2. Установите зависимости для каждого модуля:
```bash
# Клиент
cd client && npm install

# Сервер
cd server && npm install

# Бот
cd bot && npm install
```

3. Создайте файлы .env в каждой директории на основе .env.example

4. Запустите приложение:
```bash
# Клиент (порт 3000)
cd client && npm run dev

# Сервер (порт 4000)
cd server && npm run dev

# Бот
cd bot && npm run dev
```

## 📦 Технологии

### Клиент
- Vue 3 + TypeScript
- Tailwind CSS + DaisyUI
- Vue Router
- Pinia
- Telegram Web App SDK

### Сервер
- Node.js + TypeScript
- Express
- MongoDB
- JWT
- Crypto Pay API

### Бот
- Grammy
- Node.js + TypeScript

## 📝 Лицензия

MIT 