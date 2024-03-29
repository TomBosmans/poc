start:
	@docker compose start $(service)

stop:
	@docker compose stop $(service)

restart:
	@docker compose restart $(service)

up:
	@docker compose up -d

log:
	@docker compose logs -f $(service)

build:
	@docker compose build

shell:
	@docker compose run --rm --no-deps $(service) sh

prisma-studio:
	@docker compose exec app sh -c "npm run prisma:studio"

psql:
	@docker compose exec postgres sh -c "su - postgres -c 'psql $(db)'"
