# demo-zalo-mini-app

# Set up

### Tại thư mục T-CofeeShop

```bash
npm install
```

### Khởi động

- Cũng tại thư mục T-CoffeeShop, khởi chạy cả backend và frontend với 1 lệnh như sau :

```bash
npm start
```

- Với cách chạy trên, frontend sẽ được chạy mặc định ớ chế độ _browser_, có thể chạy với chế độ _divice_ với lệnh :

```bash
npm run start:device
```

=> Ngoài ra, có thể chạy riêng backend hoặc frontend :

```bash
npm run start:<backend|frontend >
# ví dụ : npm run start:backend để chạy backend riêng lẻ
```

=> Backend sẽ được chạy tại : _http://localhost:5000_

=> Frontend sẽ được khởi chạy mặc định với chế độ trình duyệt web tại :_http://localhost:3000_

### Best Practices : 
- _**Nên chạy backend một cách riêng lẻ, sau đó, sử dụng extention Zalo Mini App - với VSCode ( hoặc Zalo Developer ) để chạy app**_
---
# Database

##  Database được sử dụng là Mysql. Thực hiện các bước sau để tạo database và insert data sample :
### Bước 1 : Cấu hình kết nối database
- Cấu hình file config.json tại _**T-CoffeeShop/src/backed/config/config.json**_
- Có 3 môi trường **development**, **test**, và **production**, ở mỗi môi trường, cấu hình khác nhau để connect database phù hợp.

```json
{
  "development": {
    "username": <value>,
    "password": <value>,
    "database": <value>,
    "host": <value>,
    "port":<value>,
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": <value>,
    "password": <value>,
    "database": <value>,
    "host": <value>,
    "port":<value>,
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": <value>,
    "password": <value>,
    "database": <value>,
    "host": <value>,
    "dialect": "mysql"
  }
}
```
---
### Bước 2 : Tạo database structure:
    
- Trong Mysql, hãy tạo trước một database có tên như mục _"database"_ trên file config.json
- Tại thư mục T-Coffee/src/backend, chạy lệnh sau : 
```bash
# Nếu chạy với môi trường development thì không cần thiết có mục option
#Trong trường hợp đã có database ( bảng và dữ liệu ), khi cần tạo lại database ( để cập nhật cấu trúc bảng mới nhất ), ta thực hiện lệnh sau :
npx sequelize-cli db:migrate:undo:all [--env=test|development|
production] #lệnh này để xóa các bảng trong database trước đó

# Trường hợp vừa tạo database mới (chưa có bảng và chưa có dữ liệu)
npx sequelize-cli db:migrate [--env=test|development|production]

```
---
### Bước 03 : Insert database sample của BIT-CoffeeShop :
- Call api : sau khi chạy server theo hướng dẫn ở phần _**Khởi động**_ , chạy api sau : [localhost:5000/api/v1/insert-data](localhost:5000/api/v1/insert-data)
