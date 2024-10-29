# Gift Shop Bot

Telegram бот на Grammy для управления магазином подарков.

## 🏗 Структура проекта

```
src/
├── modules/                # Модули бота
│   ├── commands/          # Обработчики команд
│   ├── core/              # Ядро бота
│   ├── gifts/             # Логика подарков
│   ├── inline/            # Inline режим
│   ├── notifications/     # Уведомления
│   └── payment/           # Платежи
├── config/                # Конфигурация
└── index.ts              # Точка входа
```

## 🚀 Запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте .env файл:
```env
BOT_TOKEN=your_bot_token
WEBHOOK_DOMAIN=https://your-domain.com
WEBHOOK_PATH=/api/telegram/webhook
WEBAPP_URL=https://your-webapp-url.com
```

3. Запустите бота:
```bash
npm run dev
```

## 📦 Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Компиляция TypeScript
- `npm run start` - Запуск собранного бота
- `npm run webhook:set` - Установка вебхука
- `npm run webhook:delete` - Удаление вебхука

## 🛠 Технологии

- Node.js + TypeScript
- Grammy
- Axios для HTTP запросов
- Dotenv для конфигурации 