# Web Studio - Docker Deployment

Этот проект готов к деплою на VPS через Docker.

## Быстрый старт

### Локальная разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Деплой на VPS

#### 1. Простой запуск (без Nginx)

```bash
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

Приложение доступно на `http://your-vps-ip:3000`

#### 2. Продакшн с Nginx (HTTP + HTTPS)

```bash
# Запуск через скрипт деплоя
chmod +x deploy.sh
./deploy.sh production

# Или вручную
docker-compose -f docker-compose.prod.yml up -d
```

Приложение доступно на `http://your-vps-ip` (порт 80)

#### 3. Тестирование Docker локально

```bash
chmod +x test-docker.sh
./test-docker.sh
```

## Структура файлов

```
├── Dockerfile                 # Multi-stage Docker образ
├── docker-compose.yml         # Простая конфигурация (только Next.js)
├── docker-compose.prod.yml    # Продакшн конфигурация (Next.js + Nginx)
├── nginx.conf                 # Конфигурация Nginx
├── deploy.sh                  # Скрипт автоматического деплоя
├── test-docker.sh            # Скрипт тестирования Docker
├── .dockerignore             # Исключения для Docker
├── .env.example              # Пример переменных окружения
└── DEPLOYMENT.md             # Подробное руководство по деплою
```

## Управление

### Просмотр логов

```bash
# Все сервисы
docker-compose -f docker-compose.prod.yml logs -f

# Только Next.js
docker-compose -f docker-compose.prod.yml logs -f web

# Только Nginx
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Перезапуск

```bash
docker-compose -f docker-compose.prod.yml restart
```

### Обновление

```bash
git pull origin main
./deploy.sh production
```

## SSL сертификаты

Для HTTPS создайте директорию `ssl/` и поместите туда:
- `fullchain.pem` - сертификат
- `privkey.pem` - приватный ключ

Подробная инструкция в [DEPLOYMENT.md](./DEPLOYMENT.md)

## Требования к VPS

- Ubuntu 20.04+ / Debian 11+
- Docker 20.10+
- Docker Compose 2.0+
- 1GB RAM (рекомендуется 2GB)
- 10GB дискового пространства

## Поддержка

- Telegram: [@avarde808](https://t.me/avarde808)
- Email: ponomorevilya@gmail.com
- GitHub: [ilyayarovoy](https://github.com/ilyayarovoy)

## Лицензия

© 2026 НЕЙРОЦЕХ
