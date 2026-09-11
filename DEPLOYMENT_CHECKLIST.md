# Checklist для деплоя на VPS

## Перед деплоем на VPS

### 1. Локальная подготовка

- [x] `Dockerfile` создан и настроен
- [x] `docker-compose.yml` для разработки
- [x] `docker-compose.prod.yml` для продакшн
- [x] `nginx.conf` настроен
- [x] `.dockerignore` создан
- [x] `deploy.sh` скрипт готов
- [x] `next.config.js` с `output: 'standalone'`
- [ ] Протестировать Docker локально: `./test-docker.sh`

### 2. На VPS

- [ ] Установить Docker: `curl -fsSL https://get.docker.com | sh`
- [ ] Установить Docker Compose
- [ ] Добавить пользователя в группу docker: `sudo usermod -aG docker $USER`
- [ ] Создать директорию: `mkdir -p /var/www`
- [ ] Клонировать репозиторий: `git clone <repo> /var/www/web-studio`
- [ ] Перейти в директорию: `cd /var/www/web-studio`
- [ ] Сделать скрипты исполняемыми: `chmod +x deploy.sh test-docker.sh`

### 3. Базовый деплой (без SSL)

- [ ] Запустить: `docker-compose -f docker-compose.prod.yml up -d`
- [ ] Проверить логи: `docker-compose -f docker-compose.prod.yml logs -f`
- [ ] Проверить в браузере: `http://your-vps-ip`
- [ ] Проверить статус: `docker-compose -f docker-compose.prod.yml ps`

### 4. Настройка SSL (опционально)

- [ ] Установить certbot: `sudo apt install certbot -y`
- [ ] Остановить контейнеры: `docker-compose -f docker-compose.prod.yml down`
- [ ] Получить сертификат: `sudo certbot certonly --standalone -d your-domain.com`
- [ ] Создать директорию: `mkdir -p ssl`
- [ ] Скопировать сертификаты в `ssl/`
- [ ] Обновить `nginx.conf` для HTTPS
- [ ] Запустить снова: `docker-compose -f docker-compose.prod.yml up -d`

### 5. Настройка firewall

- [ ] Установить UFW: `sudo apt install ufw -y`
- [ ] Разрешить SSH: `sudo ufw allow 22`
- [ ] Разрешить HTTP: `sudo ufw allow 80`
- [ ] Разрешить HTTPS: `sudo ufw allow 443`
- [ ] Включить: `sudo ufw enable`

### 6. Автоматизация обновлений

- [ ] Настроить GitHub Actions (secrets: VPS_HOST, VPS_USER, VPS_SSH_KEY)
- [ ] Или использовать `./deploy.sh` вручную при обновлениях

### 7. Мониторинг

- [ ] Настроить автоматическое обновление SSL: добавить в crontab
- [ ] Настроить мониторинг контейнеров
- [ ] Настроить backup (опционально)

## Полезные команды

### Управление

```bash
# Запуск
docker-compose -f docker-compose.prod.yml up -d

# Остановка
docker-compose -f docker-compose.prod.yml down

# Перезапуск
docker-compose -f docker-compose.prod.yml restart

# Логи
docker-compose -f docker-compose.prod.yml logs -f

# Статус
docker-compose -f docker-compose.prod.yml ps
```

### Обновление

```bash
# Через скрипт (рекомендуется)
./deploy.sh production

# Вручную
git pull origin main
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Очистка

```bash
# Удалить неиспользуемые образы
docker image prune -f

# Полная очистка
docker system prune -a --volumes
```

## Troubleshooting

### Контейнер не запускается

1. Проверить логи: `docker-compose -f docker-compose.prod.yml logs web`
2. Проверить порты: `sudo netstat -tulpn | grep :3000`
3. Проверить конфигурацию: `docker-compose -f docker-compose.prod.yml config`

### Ошибка сборки

1. Очистить кэш: `docker builder prune -a`
2. Пересобрать: `docker-compose -f docker-compose.prod.yml build --no-cache`

### Проблемы с Nginx

1. Проверить логи Nginx: `docker-compose -f docker-compose.prod.yml logs nginx`
2. Проверить конфигурацию: `docker exec web-studio-nginx nginx -t`

## Контакты поддержки

- Telegram: @avarde808
- Email: ponomorevilya@gmail.com
