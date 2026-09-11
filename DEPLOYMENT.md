# Deployment Guide

Руководство по деплою проекта НейроЦех на VPS через Docker.

## Требования

- VPS с Ubuntu 20.04+ / Debian 11+
- Docker 20.10+
- Docker Compose 2.0+
- 1GB RAM минимум (рекомендуется 2GB)
- 10GB дискового пространства

## Быстрый старт на VPS

### 1. Установка Docker

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Проверка установки
docker --version
docker-compose --version
```

### 2. Клонирование репозитория

```bash
# Создание директории для проекта
mkdir -p /var/www
cd /var/www

# Клонирование репозитория
git clone https://github.com/yourusername/web-studio.git
cd web-studio
```

### 3. Настройка окружения

```bash
# Создание .env файла (опционально)
cat > .env << EOF
NODE_ENV=production
EOF
```

### 4. Запуск проекта

#### Простой запуск (без Nginx)

```bash
docker-compose up -d
```

Приложение будет доступно на порту 3000.

#### Продакшн запуск (с Nginx)

```bash
# Сделать скрипт деплоя исполняемым
chmod +x deploy.sh

# Запустить деплой
./deploy.sh production
```

Приложение будет доступно на портах 80 (HTTP) и 443 (HTTPS, после настройки SSL).

### 5. Настройка SSL сертификатов (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение сертификата (замените your-domain.com)
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Создание директории для SSL
mkdir -p ssl

# Копирование сертификатов
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/
```

Обновите `nginx.conf` для использования SSL:

```nginx
server {
  listen 80;
  server_name your-domain.com www.your-domain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name your-domain.com www.your-domain.com;

  ssl_certificate /etc/nginx/ssl/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/privkey.pem;
  
  # ... остальная конфигурация
}
```

### 6. Настройка автоматического обновления SSL

```bash
# Автоматическое обновление через cron
sudo crontab -e

# Добавить строку (проверка каждый день в 3:00)
0 3 * * * certbot renew --quiet && docker-compose -f /var/www/web-studio/docker-compose.prod.yml restart nginx
```

## Управление контейнерами

### Просмотр логов

```bash
# Все логи
docker-compose -f docker-compose.prod.yml logs -f

# Только логи приложения
docker-compose -f docker-compose.prod.yml logs -f web

# Только логи Nginx
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Перезапуск

```bash
# Перезапуск всех сервисов
docker-compose -f docker-compose.prod.yml restart

# Перезапуск только приложения
docker-compose -f docker-compose.prod.yml restart web
```

### Остановка

```bash
docker-compose -f docker-compose.prod.yml down
```

### Обновление приложения

```bash
# Использование скрипта деплоя (рекомендуется)
./deploy.sh production

# Или вручную
git pull origin main
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## Мониторинг

### Проверка статуса контейнеров

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Проверка использования ресурсов

```bash
docker stats
```

### Проверка healthcheck

```bash
docker inspect --format='{{json .State.Health}}' web-studio | jq
```

## Troubleshooting

### Контейнер не запускается

```bash
# Проверить логи
docker-compose -f docker-compose.prod.yml logs web

# Проверить конфигурацию
docker-compose -f docker-compose.prod.yml config
```

### Проблемы с портами

```bash
# Проверить занятые порты
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Остановить процесс на порту (если нужно)
sudo kill -9 $(sudo lsof -t -i:80)
```

### Очистка Docker

```bash
# Удалить неиспользуемые образы
docker image prune -a

# Удалить неиспользуемые тома
docker volume prune

# Полная очистка
docker system prune -a --volumes
```

## Backup

### Создание backup

```bash
# Backup контейнера
docker commit web-studio web-studio-backup-$(date +%Y%m%d)

# Сохранение образа
docker save web-studio-backup-$(date +%Y%m%d) | gzip > web-studio-backup-$(date +%Y%m%d).tar.gz
```

### Восстановление из backup

```bash
# Загрузка образа
docker load < web-studio-backup-YYYYMMDD.tar.gz
```

## Firewall (UFW)

```bash
# Установка UFW
sudo apt install ufw -y

# Разрешить SSH
sudo ufw allow 22/tcp

# Разрешить HTTP и HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Включить firewall
sudo ufw enable

# Проверить статус
sudo ufw status
```

## CI/CD (опционально)

Для автоматического деплоя при push в main ветку, настройте GitHub Actions или GitLab CI.

Пример `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/web-studio
            ./deploy.sh production
```

## Контакты

При возникновении проблем:
- Telegram: @avarde808
- Email: ponomorevilya@gmail.com
