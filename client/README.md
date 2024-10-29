# Gift Shop Client

Vue.js клиентское приложение для Telegram Mini App магазина подарков.

## 🏗 Структура проекта

```
src/
├── modules/                # Модули приложения
│   ├── gifts/             # Модуль подарков
│   ├── profile/           # Модуль профиля
│   ├── leaderboard/       # Модуль лидерборда
│   ├── payment/           # Модуль оплаты
│   └── store/             # Модуль магазина
├── shared/                # Общие компоненты и утилиты
├── router/                # Конфигурация маршрутизации
└── App.vue               # Корневой компонент
```

## 🚀 Запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте .env файл:
```env
VITE_API_URL=http://localhost:4000
VITE_BOT_USERNAME=your_bot_username
```

3. Запустите приложение:
```bash
npm run dev
```

## 📦 Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run preview` - Предпросмотр сборки
- `npm run lint` - Проверка кода
- `npm run format` - Форматирование кода

## 🛠 Технологии

- Vue 3 + TypeScript
- Tailwind CSS + DaisyUI
- Vue Router для маршрутизации
- Pinia для управления состоянием
- Telegram Web App SDK
- Heroicons для иконок 