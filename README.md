# Sales Analytics Test

## Set up and run the project

```sh
cp .env.example .env

docker-compose up -d
```

## Send test API request

```sh
curl --location 'http://localhost:8080/api/sales/insights' \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "name": "Alice Johnson",
    "email": "alice.johnson1@example.com",
    "product": "Widget A",
    "category": "Widgets",
    "amount": 120.50,
    "date": "2023-03-01",
    "state": "California"
  }
]'
```

