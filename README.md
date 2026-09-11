# НейроЦех — Web Studio Landing Page

Brutalist editorial landing page для веб-студии, специализирующейся на Telegram Mini Apps и AI-интеграциях.

## 🚀 Tech Stack

- **Next.js 15** — React framework
- **React 19** — Latest React features
- **Tailwind CSS v4** — Modern styling
- **TypeScript** — Type safety
- **Framer Motion** — Smooth animations
- **Lucide React** — Beautiful icons

## 🎨 Design System

- **Style:** Brutalist editorial with concrete-gray canvas
- **Palette:** 
  - Concrete (#f4f4f4) / Dark (#151313)
  - Ink (#201d1d) / Light (#f4f4f4)
  - Volt Lime (#a1ff62)
  - Ultraviolet (#6840ff)
- **Typography:** Inter + JetBrains Mono
- **Theme:** Light/Dark mode toggle с localStorage

## 💻 Development

### Установка зависимостей

```bash
npm install
```

### Запуск dev сервера

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Сборка для продакшн

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Быстрый запуск (без Nginx)

```bash
docker-compose up -d
```

Приложение на `http://localhost:3000`

### Продакшн с Nginx

```bash
# Через скрипт деплоя
chmod +x deploy.sh
./deploy.sh production

# Или через docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

Приложение на `http://localhost`

### Тестирование Docker локально

```bash
chmod +x test-docker.sh
./test-docker.sh
```

### Управление через Makefile

```bash
make help              # Показать все команды
make docker-build      # Собрать образ
make docker-up         # Запустить контейнеры
make docker-prod-up    # Запустить с Nginx
make docker-logs       # Просмотр логов
make deploy            # Деплой на VPS
```

## 📦 Структура проекта

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Главная страница
│   │   └── globals.css         # Стили и темы
│   └── components/ui/
│       ├── interactive-hover-links.tsx
│       ├── editorial-tech-index.tsx
│       ├── studio-terminal.tsx
│       ├── work-process.tsx
│       └── black-hole.tsx
├── Dockerfile                   # Docker образ
├── docker-compose.yml          # Dev конфигурация
├── docker-compose.prod.yml     # Prod конфигурация
├── nginx.conf                  # Nginx reverse proxy
├── deploy.sh                   # Скрипт автодеплоя
└── Makefile                    # Утилиты управления
```

## 🌟 Key Features

- 🎯 Floating pill navigation с гамбургер-меню
- 🌓 Переключатель темной/светлой темы
- 🎬 Animated marquee strip
- 🎨 Интерактивные ссылки с hover-эффектами (Framer Motion)
- 📱 Модальные окна с деталями процесса
- 💼 Services grid с ценами
- 📊 Featured case study card
- 📱 Full responsive design
- ⚡ Optimized для production

## 📚 Документация

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Полное руководство по деплою на VPS
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** — Чеклист для деплоя
- **[README.Docker.md](./README.Docker.md)** — Docker quick reference

## 🛠️ Услуги

1. **Telegram Mini Apps и боты** (20-120K ₽)
   - Aiogram, Telegram API, Webhooks, Mini Apps
   
2. **AI-агенты и LLM** (5-80K ₽)
   - OpenAI, Claude API, Gemini, RAG
   
3. **Бэкенд-системы** (10-120K ₽)
   - FastAPI, PostgreSQL, Redis, Docker
   
4. **Next.js разработка** (5-60K ₽)
   - React, TypeScript, Tailwind, SEO

## 📞 Контакты

- **Telegram:** [@avarde808](https://t.me/avarde808)
- **Email:** ponomorevilya@gmail.com
- **GitHub:** [ilyayarovoy](https://github.com/ilyayarovoy)

## 📄 Лицензия

© 2026 НЕЙРОЦЕХ. All rights reserved.
