# 🚀 Quick Start Guide

Самый быстрый способ запустить проект.

## На локальной машине (dev)

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev сервер
npm run dev

# 3. Открыть http://localhost:3000
```

## На VPS через Docker (production)

### Вариант 1: Без Nginx (простой)

```bash
# На VPS
git clone <your-repo-url> /var/www/web-studio
cd /var/www/web-studio
docker-compose up -d

# Готово! → http://your-vps-ip:3000
```

### Вариант 2: С Nginx (продакшн)

```bash
# На VPS
git clone <your-repo-url> /var/www/web-studio
cd /var/www/web-studio
chmod +x deploy.sh
./deploy.sh production

# Готово! → http://your-vps-ip
```

### Вариант 3: Автоматический деплой (GitHub Actions)

1. Добавить secrets в GitHub:
   - `VPS_HOST` — IP адрес VPS
   - `VPS_USER` — пользователь SSH
   - `VPS_SSH_KEY` — приватный ключ SSH

2. Push в `main` ветку — автоматический деплой!

## Первый запуск на VPS?

Установите Docker:

```bash
# Один раз на новом VPS
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

## Полезные команды

```bash
# Логи
docker-compose -f docker-compose.prod.yml logs -f

# Перезапуск
docker-compose -f docker-compose.prod.yml restart

# Остановка
docker-compose -f docker-compose.prod.yml down

# Обновление
git pull origin main && ./deploy.sh production
```

## Нужна помощь?

- 📖 [DEPLOYMENT.md](./DEPLOYMENT.md) — Подробное руководство
- ✅ [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) — Чеклист
- 💬 [Telegram](https://t.me/avarde808) — Поддержка
