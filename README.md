# mock

REST API mock

## 使い方 例

```bash
npm install
npm run start
```

```bash
curl -X GET http://localhost:8090/todos
```

```bash
curl -X GET http://localhost:8090/todos/1
```

```bash
curl -X POST http://localhost:8090/todos -H "Content-Type: application/json" -d '{"title": "todo1"}'
```

```bash
curl -X PUT http://localhost:8090/todos/1 -H "Content-Type: application/json" -d '{"title": "todo1", "completed": true}'
```

```bash
curl -X DELETE http://localhost:8090/todos/1
```

## support
```
URL: http://localhost:8090
```

| METHOD | PATH PARAMS      | description                |
| ------ | ---------------- | -------------------------- |
| GET    | /{resource}      | 全ての{resource}を取得     |
| GET    | /{resource}/{id} | {id}を持つ{resource}を取得 |
| POST   | /{resource}      | {resource}を新規作成       |
| PUT    | /{resource}/{id} | {id}を持つ{resource}を更新 |
| DELETE | /{resource}/{id} | {id}を持つ{resource}を削除 |
