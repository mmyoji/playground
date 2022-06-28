# README - Rails Playground

## Apps

1. web app:   For `User`s who want to find and book a `Room` of a `Studio`.
1. biz app:   For `StaffMember`s who want to show `Room`s of their `Studio`s and manage `Booking`s.
1. admin app: For `AdminUser`s who operate all apps as an administrator.

## Requirements

* docker

## Setup

```sh
$ cp .env.example .env
# and tweak environment variables if needed

$ make setup
```

## Test

```sh
$ make test

# Run only controller tests
$ docker compose exec web bin/rails test:controllers
```

## Access DB

```
$ docker compose exec postgres psql -U <postgres_username> -h postgres -d rails-pg_development
```

