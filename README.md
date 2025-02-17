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

## Example:

Request
```
{
  "orders": [
    {
      "name": "Alice Johnson",
      "email": "alice.johnson1@example.com",
      "product": "Widget A",
      "category": "Widgets",
      "amount": 120.5,
      "date": "2023-03-01",
      "state": "California"
    },
    {
      "name": "Bob Smith",
      "email": "bob.smith2@example.com",
      "product": "Widget A",
      "category": "Widgets",
      "amount": 85,
      "date": "2023-03-02",
      "state": "California"
    }
  ]
}
```

Response (200)
```
{
  "metrics": {
    "totalSales": 205.5,
    "avgSales": 102.75,
    "bestCategory": "Widgets"
  },
  "summaryHumman": "The total sales amounted to $205.50, with an average transaction value of $102.75. The best-performing category was 'Widgets'."
}
```

❌ Response (400 - Bad Request)
```
{
  "errors": {
    "0": {
      "amount": {
        "_errors": ["Required"]
      }
    }
  }
}
```

❌ Response (500 - Internal Server Error)
```
{
  "error": "Missing OpenAI API key"
}
```
