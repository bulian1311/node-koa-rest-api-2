# Magmer API

## Быстрый старт

```bash
# Установить зависимости
npm install

# Запустить приложение
npm run start
```

## Endpoints

### Получить информацию о приложении

#### Публичный

```bash
GET /
```

### Авторизация

```bash
POST /login

# Образец запроса
# {
#   "login": "login",
#   "password": "password",
# }
```

### Получить список продуктов из базы данных

#### Публичный

```bash
GET /product/list
```

### Получить один продукт из базы данных

#### Публичный

```bash
GET /product/{id}
```

### Добавить продукт в базу данных

#### JWT защита

```bash
POST /product

# Образец запроса
# {
#   "title": "Название продукта",
#   "description": "Описание продукта",
#   "price": "123",
#   "url": "http://test.com/product/1",
#   "images": [{"url": "http://test.com/image/1"}],
#   "specifications": {"key": "value"}
#   "category": {title: "Название категории"},
#   "producer": {name: "Имя поставщика", url: "test.ru"}
# }
```

### Отредактировать продукт в базе данных

#### JWT защита

```bash
PUT /product/{id}

# Образец запроса
# {
#   "title": "Новое название продукта",
#   "description": "Новое описание продукта",
# }
```

### Удалить продукт из базы данных

#### JWT защита

```bash
DELETE /product/{id}
```

### Найти продукт в базе данных по ключевым словам

```bash
GET /search?query=text
```

## App Info

### Author

Nikolay Kachanov

### Version

1.0.0
