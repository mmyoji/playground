.PHONY: setup
setup:
	docker compose up -d
	docker compose exec web bin/rails db:create db:migrate db:seed
	docker compose exec -e RAILS_ENV=test web bin/rails db:migrate

.PHONY: console
console:
	docker compose exec web bin/rails c

.PHONY: test
test:
	docker compose exec web bin/rails test --pride
