# Makefile для управления проектом

.PHONY: help install dev build start test docker-build docker-up docker-down docker-logs deploy clean

help: ## Показать справку
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	npm install

dev: ## Запустить dev сервер
	npm run dev

build: ## Собрать проект
	npm run build

start: ## Запустить production сервер
	npm start

docker-build: ## Собрать Docker образ
	docker-compose build

docker-up: ## Запустить Docker контейнеры
	docker-compose up -d

docker-down: ## Остановить Docker контейнеры
	docker-compose down

docker-logs: ## Показать логи Docker
	docker-compose logs -f

docker-prod-up: ## Запустить продакшн с Nginx
	docker-compose -f docker-compose.prod.yml up -d

docker-prod-down: ## Остановить продакшн
	docker-compose -f docker-compose.prod.yml down

docker-prod-logs: ## Логи продакшн
	docker-compose -f docker-compose.prod.yml logs -f

test-docker: ## Тестировать Docker локально
	./test-docker.sh

deploy: ## Деплой на VPS
	./deploy.sh production

clean: ## Очистить кэш и билды
	rm -rf .next node_modules out dist
	docker system prune -f
